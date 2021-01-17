class Retailer {
  
  constructor(attributes) {
    let whiteList = ["id", "name"]
    whiteList.forEach(attr => this[attr] = attributes[attr])
  }

  static container() {
    return this.c ||= document.querySelector("#retailers")
  }

  static findById(id) {
    return this.collection.find(retailer => retailer.id == id)
  }

  static all() {
    return fetch("http://localhost:3000/retailers")
      .then(res => res.json())
      .then(retailerJson => {
        this.collection = retailerJson.map(rAttributes => new Retailer(rAttributes))
        let listItems = this.collection.map(list => list.render())
        this.container().append(...listItems)
        return this.collection
      })
  }

  static create(formData) {
    return fetch("http://localhost:3000/retailers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)  
    })
      .then(res => res.json())
      .then(json => {
        let retailer = new Retailer(json);
        this.collection.push(retailer);
        this.container().appendChild(retailer.render());
        return retailer;
      })
      .catch(err => alert(err));
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
    .then(json => {
      let index = Retailer.collection.findIndex(retailer => retailer.id == json.id);
      Retailer.collection.splice(index, 1);
      this.element.remove();
    })
  }

  render() {
    this.element ||= document.createElement('li');

    this.element.classList.add(..."my-2 px-4 bg-blue-200 grid grid-cols-12 sm:grid-cols-6".split(" "));
    this.retailerName ||= document.createElement('p');
    this.retailerName.classList.add(..."py-4 col-span-10 sm:col-span-4".split(" "));
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
}
