const loginDiv = document.getElementById("login")
const dashboardDiv = document.getElementById("dashboard")
const loadingDiv = document.getElementById("loading")

const startTracking = (event) => {
  
}

const stopTracking = (event) => {
  console.log(event)
}

const startButton = document.getElementById("start-btn")
startButton.onclick = startTracking

const stopButton = document.getElementById("stop-btn")
stopButton.onclick = stopTracking

const getTabId = async () => {
  browser.tabs.query({
    url: "https://app.roll20.net/editor/"
  }).then(result => {
    return result.length > 0 ? result[0].id : -1
  }, error => {
    console.log(error)
    return -1
  })
}

const onFullfilled = (result) => {
  console.log(result)
  loadingDiv.classList.toggle("hidden")
  if (result.hasOwnProperty("token")) {
    dashboardDiv.classList.toggle("hidden")
  } else {
    dashboardDiv.classList.toggle("hidden")
    loginDiv.classList.toggle("hidden") // Remove once API exists
  }
};

const onRejected = (error) => {
  rootDiv.textContent = error.message
}

const storage = browser.storage.local.get("dnd-rolltracker")
storage.then(onFullfilled, onRejected)