const chatDiv = document.getElementById("textchat")
const chatContentDiv = chatDiv.getElementsByClassName("content")[0]

const getNameForRoll = (node) => {
  let nameNode = node
  while (nameNode.getElementsByClassName("by").length == 0) {
    console.log(nameNode)
    nameNode = nameNode.previousElementSibling
  }
  return nameNode.getElementsByClassName("by")[0].innerHTML.slice(0, -1)
}

let tracking = false
let token
let game

const mutationObserver = new MutationObserver((mutations, _observer) => {
  mutations.forEach(mutation => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLDivElement && node.classList.contains("message")) {
          console.log(node)
          const data = {
            messageId: node.attributes.getNamedItem("data-messageid").value,
            individualRolls: [],
            game: game
          }
          if (node.classList.contains("rollresult")) {
            const formulaDiv = node.getElementsByClassName("formula")[0]
            const formulaDivValue = formulaDiv.innerHTML // Space after "rolling"
            const indexOfSpace = formulaDivValue.indexOf(" ")
            const formula = formulaDivValue.slice(indexOfSpace + 1)
            data.playerName = getNameForRoll(node)
            const resultDiv = node.getElementsByClassName("rolled")[0]
            data.individualRolls.push({
              formula,
              label: "Basic Roll",
              rawResult: resultDiv.innerHTML,
              result: resultDiv.innerHTML
            })
          } else if (node.classList.contains("general")) {
            const sheetDescDiv = node.getElementsByClassName("sheet-desc")
            const sheetContainerDiv = node.getElementsByClassName("sheet-container")[0]
            let rollSheets = []

            console.log("Here 1")
            data.playerName = getNameForRoll(node)
            console.log("Here 1.2")
            let isLabel = false
            let rollType
            if (sheetDescDiv.length) {
              console.log("Here 1.3")
              rollSheets = [].slice.call(sheetDescDiv)
            } if (sheetContainerDiv) {
              console.log("Here 1.4")
              isLabel = !sheetContainerDiv.classList.contains("sheet-damagetemplate")
              console.log("Here 1.4.1")
              const sheetSoloDivs = sheetContainerDiv.getElementsByClassName("sheet-solo")
              console.log("Here 1.4.2")
              const sheetAdvDivs = sheetContainerDiv.getElementsByClassName("sheet-adv")
              for (let sheet of sheetSoloDivs) {
                rollSheets.push(sheet)
              }
              for (let sheet of sheetAdvDivs) {
                rollSheets.push(sheet)
              }
              console.log("Here 1.4.3")
            } else {
              console.log("Here 1.5", sheetDescDiv.length, sheetContainerDiv)
              return
            }
            console.log("Here 2", rollSheets)
            for (let rollSheet of rollSheets) {
              console.log("Here 3", rollSheet)
              const inlinerollresults = rollSheet.getElementsByClassName("inlinerollresult")
              Array.from(inlinerollresults).forEach((irr, i) => {
                const originalTitle = irr.attributes.getNamedItem("title").value
                const endfOfFirstTag = originalTitle.indexOf(">") // End of the image tag 
                const removeFirstTag = originalTitle.slice(endfOfFirstTag + 1).trim()
                const firstWhiteSpace = removeFirstTag.indexOf(" ") // Whitespace after "Rolling"
                const removedRolling = removeFirstTag.slice(firstWhiteSpace + 1).trim()
                const indexOfEqual = removedRolling.indexOf("=") // The equal sign after the formula
                const formula = removedRolling.slice(0, indexOfEqual).trim()
                const removedFormula = removedRolling.slice(indexOfEqual + 1)
                const indexOfAngleBracketClosed = removedFormula.indexOf(">") // The end of the span tag 
                const removedFirstSpan = removedFormula.slice(indexOfAngleBracketClosed + 1)
                const indexOfAngleBracketOpen = removedFirstSpan.indexOf("<") // The start of the tag after the raw result
                const rawResult = removedFirstSpan.slice(0, indexOfAngleBracketOpen)
                let label
                console.log("3.1")
                if (isLabel) {
                  label = sheetContainerDiv.getElementsByClassName("sheet-label")[0].getElementsByTagName("a")[0].innerHTML
                } else {
                  label = rollSheet.getElementsByClassName("sheet-sublabel")[0].innerHTML
                }
                data.individualRolls.push({
                  formula,
                  result: irr.innerHTML,
                  label: (i != 0 ? "CRIT " : "") + label,
                  rawResult
                })
              })
            }
          }
          const jsonBody = JSON.stringify(data)
          console.log(jsonBody)
          window.fetch("http://localhost:8080/api/roll/pushRolls", {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              rolls: [data]
            })
          })
            .then(result => console.log(result))
            .catch(error => console.log(error))
        }
      })
    }
  })
})

browser.runtime.onMessage.addListener(message => {
  if (message.type === "startTracking") {
    token = message.token
    game = message.game
    tracking = true
    mutationObserver.observe(chatContentDiv, {
      childList: true
    })
    return Promise.resolve({ status: "Success" })
  } else if (message.type === "stopTracking") {
    tracking = false
    mutationObserver.disconnect()
    return Promise.resolve({ status: "Success" })
  } else if (message.type === "getTrackingStatus") {
    return Promise.resolve({ 
      tracking: tracking, 
      id: message.id,
      title: message.title
    })
  }
})