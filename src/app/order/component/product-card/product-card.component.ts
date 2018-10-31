import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OrderService, Product } from '../../service/order.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Output() onPrediction = new EventEmitter();
  showInput: boolean = false;
  quantity: number = 0;
  pending: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  onClick() {
    if(!this.showInput){
      this.showInput = true;
      return;
    }

    if(Number.isNaN(+this.quantity)) return;

    if(!this.product.predicted) {
      this.submitPrediction()
    } else {
      this.placeOrder();
    }
  }

  submitPrediction() {
    this.pending = true;
    this.orderService.makePrediction(this.product._id, this.quantity).subscribe(prediction => {
      console.log(prediction);
      this.onPrediction.emit({id: this.product._id, quantity: this.quantity});
      this.showInput = false;
      this.pending = false;
      this.quantity = 1;
    }, err => {
      this.pending = false;
    })
  }

  placeOrder() {
    this.pending = true;
    this.orderService.placeOrder(this.product._id, this.quantity).subscribe(order => {
      console.log(order);
      this.showInput = false;
      this.pending = false;
      this.quantity = 1;
    }, err => {
      this.pending = false;
    });
  }

}
