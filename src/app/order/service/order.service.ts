import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private http: HttpClient) {

  }

  getProducts() {
    return this.http.get("/api/products").pipe(
      map(res => res["result"])
    );
  }

  addProduct(product: {name: string}) {
    return this.http.post("/api/products", product).pipe(
      map(res => res["result"] as Product)
    );
  }

  makePrediction(productId, qunatity: number | string) {
    return this.http.post("/api/predict", {productId, qunatity}).pipe(
      map(res => res["result"])
    );
  }

  placeOrder(productId, quantity: number | string) {
    return this.http.post("/api/order", {productId, quantity}).pipe(
      map(res => res["result"])
    );
  }

  getReport(): Observable<Report[]> {
    return this.http.get("/api/prediction-report").pipe(
      map(res => res["result"])
    );
  }

  updateOrderStatus(orderId: string) {
    return this.http.put(`/api/order/complete/${orderId}`, null).pipe(
      map(res => res["result"])
    );
  }
  
}

export interface Report {
  _id: string;
  dishName: string;
  produced: number;
  predicted: number;
}

export interface Product {
  _id: string;
  name: string;
  predicted: boolean;
}
