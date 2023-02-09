const gameSelect = document.getElementById("gameSelect")

browser.storage.local.get("token").then(token => {
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
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error: " + error)
      }
      return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
}).catch(error => window.location.replace("login_popup.html"))

