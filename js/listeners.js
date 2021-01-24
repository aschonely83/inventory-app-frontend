document.addEventListener('click', function(e) {
  console.dir(e.target)    
})

document.addEventListener('DOMContentLoaded', function(e) {
  Retailer.all();
})

document.addEventListener('click', function(e) {
  let target = e.target;
  
  if(target.matches('.deleteRetailer')) {
    let retailer = Retailer.findById(target.dataset.retailerId);
    retailer.delete();
  } else if(target.matches('.selectRetailer')) {
    let retailer = Retailer.findById(target.dataset.retailerId);
    retailer.show();
  }  
})

document.addEventListener('submit', function(e) {
  let target = e.target;
  if(target.matches("#newRetailer")) {
    e.preventDefault();
    let nameInput = target.querySelector('input[name="name"]')
    let formData = {
      name: nameInput.value
    };
    Retailer.create({retailer: formData})
      .then(() => nameInput.value = "");
  } else if(target.matches('#newPallet')) {
      e.preventDefault();
      let boxInput = target.querySelector('input[name="boxes"]')
      let formData = {
      boxes: boxInput.value
    };
    Pallet.create(formData)
      .then(() => boxInput.value = "")
  }
})