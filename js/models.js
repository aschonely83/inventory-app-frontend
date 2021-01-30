class Retailer {
  
  constructor(attributes) {
    let whiteList = ["id", "name", "active"]
    whiteList.forEach(attr => this[attr] = attributes[attr])
  }

  static container() {
    return this.c ||= document.querySelector("#retailers")
  }

  static all() {
    return fetch("http://localhost:3000/retailers")
      .then(res => res.json())
      .then(retailerJson => {
        this.collection = retailerJson.map(rAttributes => new Retailer(rAttributes))
        let retailers = this.collection.map(retailer => retailer.render())
         this.container().append(...retailers)
        return this.collection
      })
  }

  static findById(id) {
    return this.collection.find(retailer => retailer.id == id)
  }

  static filterBy(query) {
    query = query.toLowerCase()
    let filterArray = this.collection.filter(retailer => {
      return retailer.name.toLowerCase() === query
    })
    
    filterArray.forEach(retailer => this.container().append(retailer.render()))
  } 
  
  static create(formData) {
    return fetch("http://localhost:3000/retailers", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)  
    })
      .then(res => res.json())
      .then(retailerAttributes => {
        let retailer = new Retailer(retailerAttributes);
        this.collection.push(retailer);
        this.container().appendChild(retailer.render());
        return retailer;
      })
      .catch(err => alert(err));
  }

  show() {
    return fetch(`http://localhost:3000/retailers/${this.id}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
     .then(resp => resp.json())
     .then(({id, palletsAttributes}) => {
       Pallet.loadFromRetailer(id, palletsAttributes);
       this.markActive();
     })
  }

  markActive() {
    if(Retailer.active) {
      Retailer.active.element.classList.replace("bg-blue-400", "bg-blue-200");
      Retailer.active.active = false;
    }
    this.element.classList.replace("bg-blue-200", "bg-blue-400");
    Retailer.active = this;
  }

  delete() {
    return fetch(`http://localhost:3000/retailers/${this.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(({id}) => {
      let index = Retailer.collection.findIndex(pallet => pallet.id == id)
      Retailer.collection.splice(index, 1);
      this.element.remove();
      if(id == Pallet.active_retailer_id) {
        Pallet.container().innerHTML = `<li class="my-2 p-4">Select a Retailer to see pallets</li>`
        return this;
      }
    })
  }

  render() {
    this.element ||= document.createElement('li');
    this.element.classList.add(..."my-2 px-4 bg-blue-200 grid grid-cols-12 sm:grid-cols-6".split(" "));

    this.retailerName ||= document.createElement("a");
    this.retailerName.classList.add(..."py-4 col-span-10 sm:col-span-4 selectRetailer".split(" "));
    this.retailerName.dataset.retailerId = this.id
    this.retailerName.textContent = this.name;
    if(!this.delLink) {
      this.delLink = document.createElement("a");
      this.delLink.classList.add(..."my-1".split(" "));
      this.delLink.innerHTML = `<i class="fas fa-trash-alt deleteRetailer p-4 cursor-pointer" data-retailer-id=${this.id}></i>`;
    }

    this.element.append(this.retailerName, this.delLink);
    return this.element;
  }
}

class Pallet {

  constructor(attributes) {
    let whiteList = ["id", "boxes", "retailer_id"]
    whiteList.forEach(attr => this[attr] = attributes[attr]);
  }

  static container() {
    return this.c ||= document.querySelector("#boxes")
  }
  
  static collection() {
    return this.coll ||= {};
  }
  
  static loadFromRetailer(id, palletsAttributes ) {
    Pallet.active_retailer_id = id;
    let pallets = palletsAttributes.map(palletAttributes => new Pallet(palletAttributes));
    this.collection()[id] = pallets;
    let rendered = pallets.map(pallet => pallet.render())
    this.container().innerHTML = "";
    this.container().append(...rendered)
  }
  
  static create(formData) {
    if(!Pallet.active_retailer_id) {
    }else {
     formData.retailer_id = Pallet.active_retailer_id;
    }
    return fetch("http://localhost:3000/pallets", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pallet: formData
      })
    })
     .then(res => res.json())
     .then(palletData => {
       let pallet = new Pallet(palletData);
       this.collection()[Pallet.active_retailer_id].push(pallet);
       this.container().append(pallet.render())
       return pallet;
     })
  }

  render() {
    this.element ||= document.createElement('li');
    this.element.classList.add(..."my-2 px-1 bg-blue-200 grid grid-cols-12".split(" "));

    this.palletBoxes ||= document.createElement('a');
    this.palletBoxes.classList.add(..."py-4 col-span-9".split(" "));
    this.palletBoxes.textContent = this.boxes;
   
    this.element.append(this.palletBoxes);
    return this.element;
  }
}
