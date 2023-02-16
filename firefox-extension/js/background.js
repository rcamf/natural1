browser.runtime.onStartup.addListener(() => {

})

browser.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
  if (message.type) {
    console.log(message)
    if (message.type === "bgStartTracking") {
      const rolltrackerMessage = await browser.tabs.sendMessage(Number(message.tab), {
        type: "startTracking",
        token: message.token,
        game: message.game
      })
      if (rolltrackerMessage.status && rolltrackerMessage.status === "Success") {
        return Promise.resolve({
          status: "Success"
        })
      } else {
        throw response
      }
    } else if (message.type === "bgStopTracking") {
      const stopTrackingMessage = await browser.tabs.sendMessage(Number(message.tab), {
        type: "stopTracking"
      })
      if (stopTrackingMessage.status && stopTrackingMessage.status === "Success") {
        return Promise.resolve({
          status: "Success"
        })
      }
    } else if (message.type === "bgGetTrackingTabs") {
      const tabs = await browser.tabs.query({
        url: "https://app.roll20.net/editor/"
      })
      const responses = []
      tabs.forEach(tab => {
        responses.push(browser.tabs.sendMessage(tab.id, {
          type: "getTrackingStatus",
          id: tab.id,
          title: tab.title
        }))
      });
      return Promise.all(
        responses
      ).then(responses => {
        const trackingTabs = responses.filter(response => response.tracking).map(data =>  {
          return {
            id: data.id,
            title: data.title
          }
        })
        return Promise.resolve({
          status: "Success",
          tabs: trackingTabs
        })
      }).catch(error => console.error(`Error: ${error}`))
    }
  }
})