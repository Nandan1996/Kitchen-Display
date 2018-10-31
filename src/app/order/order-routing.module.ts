import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './component/products/products.component';
import { KitchenDisplayComponent } from './component/kitchen-display/kitchen-display.component';
import { OrderReportComponent } from './order-report/order-report.component';

const routes: Routes = [
    {path: "", redirectTo: "products", pathMatch: "full"},
    {path: "products", component: ProductsComponent},
    {path: "kitchen-display", component: KitchenDisplayComponent},
    {path: "order-report", component: OrderReportComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderRoutingModule {

}