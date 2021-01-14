class Retailer {
    
    constructor(id, name){
      this.id = id  
      this.name = name
      Retailer.all.push(this)
    }
}

Retailer.all = []