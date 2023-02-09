browser.runtime.onStartup.addListener(() => {
  browser.storage.local.get("token").then(result => {
    console.log(result)
  })
})