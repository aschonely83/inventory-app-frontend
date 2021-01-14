class Retailer {
    
    constructor(data){
      this.id = data.id  
      this.name = data.name
      RetailerList.all.push(this)
    }
}

RetailerList.all = []