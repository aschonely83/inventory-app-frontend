class Pallet {

  constructor(id, boxes, retailer_id) {
    this.id = id
    this.boxes = boxes
    this.retailer_id = retailer_id
    
    Pallet.all.push(this)
  }    
}

Pallet.all = []