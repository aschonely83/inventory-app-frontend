const BASE_URL = "http://localhost:3000"
const RETAILERS_URL = `${BASE_URL}/retailers`
const PALLETS_URL = `${BASE_URL}/pallets`

document.addEventListener("DOMContentLoaded", () => {
 getRetailer();
 getPallet();  
});

function getRetailer() {
  fetch(RETAILERS_URL)
  .then(resp => resp.json())
  .then(retailers => { 
    retailers.data.forEach(retailer => {
      makeRetailerList(retailer)
    })
  })
}

function makeRetailerList(retailer) {
  const retailerList = document.querySelector('#lists')
  const retailerElement = document.createElement("h4")
  
  retailerElement.id =`retailer-name-${retailer.id}`
  retailerElement.innerText = retailer.attributes.name
  
  retailerList.appendChild(retailerElement)
}

function getPallet() {
  fetch(PALLETS_URL)
  .then(resp => resp.json())
  .then(pallets => { 
    pallets.data.forEach(pallet => {
      makePalletList(pallet)
    })
  })
}

function makePalletList(pallet) {
  const retailerList = document.querySelector('#lists')
  const palletElement = document.createElement("p")
  
  retailerList.append(palletElement)

  palletElement.id =`pallet-boxes-${pallet.id}`
  palletElement.innerText = pallet.attributes.boxes
  
  
}
