browser.runtime.onStartup.addListener(() => {
  browser.tabs.create({
    url: "./static/login.html"
  })
})
