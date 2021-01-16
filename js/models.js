class Retailer {
  
  constructor(attributes) {
    let whiteList = ["id", "name"]
    whiteList.forEach(attr => this[attr] = attributes[attr])
  }

  static container() {
    return this.c ||= document.querySelector("#retailersContainer")
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

  render() {
    this.element ||= document.createElement('li');

    this.element.classList.add(..."my-2 px-4 bg-blue-200 grid grid-cols-12 sm:grid-cols-6".split(" "));
    this.retailerName ||= document.createElement('p');
    this.retailerName.classList.add(..."py-4 col-span-10 sm:col-span-4".split(" "));
    this.retailerName.textContent = this.name;

    this.element.append(this.retailerName);
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
