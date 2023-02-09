const form = document.forms.namedItem("signup-form")
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  if (form.checkValidity()) {
    let test = fetch("http://localhost:8080/api/auth/signin", {
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        email: form.elements.namedItem("inputEmail").value,
        password: form.elements.namedItem("inputPassword").value
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error: " + res)
        }
        return res.json()
      })
      .then(data => {
        let token = data.token
        console.log(token)
        browser.storage.local.set({
          token: token
        }).then(test => {
          console.log(test)
          browser.browserAction.setPopup({
            popup: "./default_popup.html"
          })
          window.location.replace("./default_popup.html")
        })
      })
      .catch(error => console.log(error))

    // .then(response => {
    //   if (response.status == 200) {
    //     console.log(response.bodyUsed, response.body.getReader().read().then(test => console.log(test)))
    //     response.json()
    //   } else {
    //     console.log(response)
    //   }
    // }).then(result => {

    // }).catch(error => console.log(error))
  }
})