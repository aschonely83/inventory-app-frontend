class RetailerList {
  constructor(name){
    this.name = name
  }

  static container() {
    return this.c ||= document.querySelector('#lists')
  }

  static all() {
    return fetch("http://localhost:3000/retailers")
      .then(res => res.json())
      .then(retailerList => {
        this.collection = retailerList.map(rAttributes => new RetailerList(rAttributes))
        let listItems = this.collection.map(list => list.render())
        this.container().append(...listItems)
        return this.collection
      })
  }

  render() {
    this.element ||= document.createElement('li');

    this.element.classList.add('nameList');
    this.name ||= document.createElement('p');
    this.name.classList.add('name');
    this.name.dataset.retailerId = this.retailerId;
    this.name.textContent = this.name;

    this.element.append(this.name);
    return this.element;
  } 
}