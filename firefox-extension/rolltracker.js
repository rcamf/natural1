const chatDiv = document.getElementById("textchat")
const chatContentDiv = chatDiv.getElementsByClassName("content")[0]

let lastID = ""

const parser = new DOMParser()

const mutationObserver = new MutationObserver((mutations, observer) => {
  mutations.forEach(mutation => {
    if(mutation.type === "childList") {
      mutation.addedNodes.forEach(node => {
        if(node instanceof HTMLDivElement && node.classList.contains("message")) {
          if(node.classList.contains("rollresult")) {
            
          } else if (node.classList.contains("general")) {
            const data = {
              message_id: node.attributes.getNamedItem("data-messageid"),
              rolls: []
            }
            let nameNode = node
            while(nameNode.childElementCount != 5) {
              nameNode = nameNode.previousElementSibling
            }
            data.name = nameNode.children[3].innerHTML.slice(0, -1)
            // @TODO: Add tracking for sneak damage
            const sheetContainerDiv = node.getElementsByClassName("sheet-container")[0]
            const sheetDescDiv = node.getElementsByClassName("sheet-desc")[0]
            if (sheetContainerDiv.classList.contains("sheet-damagetemplate")) {
              const sheetSoloDiv = sheetContainerDiv.getElementsByClassName("sheet-solo")[0]
              const inlinerollresults = sheetSoloDiv.getElementsByClassName("inlinerollresult")
              Array.from(inlinerollresults).forEach(irr => {
                const originalTitle = irr.attributes.getNamedItem("title").value
                const formula = originalTitle.slice()
                
              })
            }            
          }
        }
      })
    }
  })
})

mutationObserver.observe(chatContentDiv, {
  childList: true
})

browser.runtime.onMessage.addListener((message, sender, response) => {
})

