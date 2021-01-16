class Retailer {
  
  constructor(attributes) {
    let whiteList = ["id", "name"]
    whiteList.forEach(attr => this[attr] = attributes[attr])
  }

  static container() {
    return this.c ||= document.querySelector("#retailersContainer")
  }

  static list() {
    return this.l ||= document.querySelector("#retailers")
  }

  static all() {
    fetch("http://localhost:3000/retailers")
  }
}