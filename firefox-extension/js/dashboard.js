const gameSelect = document.getElementById("gameSelect")
const tabSelect = document.getElementById("tabSelect")
const trackingTabSelect = document.getElementById("trackingTabSelect")
const submitButton = document.getElementById("submitButton")
const stopButton = document.getElementById("stopButton")
const startDiv = document.getElementById("startTracking")
const stopDiv = document.getElementById("stopTracking")

browser.storage.local.get("token").then(token => {
  browser.storage.local.get("tracking").then(tracking => {
    if (tracking !== {} && tracking.tracking) {
      stopDiv.classList.remove("d-none")
      browser.runtime.sendMessage({
        type: "bgGetTrackingTabs"
      }).then(response => {
        if (response.status && response.status === "Success") {
          response.tabs.forEach(tab => {
            const option = document.createElement("option")
            option.text = tab.title,
            option.value = tab.id
            trackingTabSelect.add(option)
          })
        }
      })
      stopButton.addEventListener("click", event => {
        event.preventDefault()
        browser.runtime.sendMessage({
          type: "bgStopTracking",
          tab: trackingTabSelect.value
        }).then(response => {
          if (response.status && response.status === "Success") {
            stopDiv.classList.add("d-none")
            startDiv.classList.remove("d-none")
            browser.storage.local.set({
              tracking: false
            })
          }
        })
      })
    } else {
      startDiv.classList.remove("d-none")
      fetch("http://localhost:8080/api/game/findGames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.token
        },
        body: JSON.stringify({
          filter: {},
          projection: {},
          options: {}
        })
      }).then(res => {
        if (!res.ok) {
          throw new Error("Error: " + error)
        }
        return res.json()
      }).then(async data => {
        browser.tabs.query({
          url: "https://app.roll20.net/editor/"
        }).then(tabs => {
          data.data.forEach(game => {
            const option = document.createElement("option")
            option.text = game.name
            option.value = game._id
            gameSelect.add(option)
          });
          tabs.forEach(tab => {
            const option = document.createElement("option")
            option.text = tab.title
            option.value = tab.id
            tabSelect.add(option)
          })
          submitButton.addEventListener("click", event => {
            event.preventDefault()
            if (gameSelect.value && tabSelect.value) {
              browser.runtime.sendMessage({
                type: "bgStartTracking",
                game: gameSelect.value,
                token: token.token,
                tab: tabSelect.value
              }).then(response => {
                if (response.status && response.status === "Success") {
                  browser.storage.local.set({
                    tracking: true
                  })
                  stopDiv.classList.remove("d-none")
                  startDiv.classList.add("d-none")
                } else {
                  alert("ERROR")
                }
              })
            }
          })
        })
      })
    }
  }).catch(error => console.log(error))
}).catch(error => window.location.replace("login_popup.html"))



getTrackingTabs = () => {
  
}

