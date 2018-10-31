import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { OrderModule } from './order/order.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    OrderModule,
    AppRoutingModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
