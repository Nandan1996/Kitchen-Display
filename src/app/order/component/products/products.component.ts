import { Component, OnInit } from '@angular/core';
import { OrderService, Product } from '../../service/order.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getProducts().subscribe(res => {
      this.products = res || [];
    });
  }

  onPrediction({id}) {
    let index = this.products.findIndex(item => item._id === id);
    if(index !== -1) {
      this.products[index].predicted = true; 
    }
  }

  addProduct(control: NgModel) {
    if(control.value === "") return;
    this.orderService.addProduct({name: control.value}).subscribe(product => {
      this.products.push(product);
      control.reset();
    });
  }

}
