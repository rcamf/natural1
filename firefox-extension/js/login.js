const form = document.forms.namedItem("signup-form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  if (form.checkValidity()) {
    fetch("http://localhost:8080/api/auth/signin", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: form.elements.namedItem("inputEmail").value,
        password: form.elements.namedItem("inputPassword").value
      })
    }).then(result => {
      browser.storage.local.set({
        token: result.token
      }).then(_ => {
        browser.browserAction.setPopup({
          popup: "./default_popup.html"
        })
        window.location.replace("./default_popup.html")
      }).catch(error => console.log(error))
    }).catch(error => {
      console.log(error)
    })
  }
})