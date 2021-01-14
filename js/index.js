document.addEventListener("DOMContentLoaded", () => {
 getRetailer();  
});

function getRetailer() {
  fetch("http://localhost:3000/retailers")
  .then(resp => resp.json())
  .then(retailers => {
    retailers.data.forEach(retailer => {
      makeRetailerList(retailer)
    })
  })
}

function makeRetailerList() {
  const retailerList = document.querySelector("#list")
  const nameElement = document.createElement("h4")
  nameElement.id =`retailer-name-${retailer.id}`
  retailerElement.innerText = retailer.attributes.name
  retailerList.appendChild(nameElement)
}
