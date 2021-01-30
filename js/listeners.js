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
    //remove retailer that aren't filtered, then rendering the ones that meet the filter

   //remove all and just render the filtered ones, filter on what is in the input

})

document.addEventListener('keyup', e => {
  if(e.target.name === 'filter') {
    Retailer.filterBy(e.target.value)
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