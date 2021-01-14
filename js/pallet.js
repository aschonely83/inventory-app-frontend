class Pallet {

  constructor(data) {
    this.id = data.id
    this.boxes = data.boxes
    this.retailer_id = data.retailer_id
    
    Pallet.all.push(this)
  }    
}

Pallet.all = []