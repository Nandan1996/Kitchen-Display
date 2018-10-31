import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { ProductCardComponent } from './component/product-card/product-card.component';
import { ProductsComponent } from './component/products/products.component';
import { OrderRoutingModule } from './order-routing.module';
import { KitchenDisplayComponent } from './component/kitchen-display/kitchen-display.component';
import { OrderReportComponent } from './order-report/order-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    HttpClientModule,
    OrderRoutingModule
  ],
  declarations: [ProductsComponent, ProductCardComponent, KitchenDisplayComponent, OrderReportComponent]
})
export class OrderModule { }
