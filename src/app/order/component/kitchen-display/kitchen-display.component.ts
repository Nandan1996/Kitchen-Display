import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { Observable } from 'rxjs';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-kitchen-display',
  templateUrl: './kitchen-display.component.html',
  styleUrls: ['./kitchen-display.component.css']
})
export class KitchenDisplayComponent implements OnInit {

  order$: Observable<any>;

  constructor(private socketService: SocketService, private orderService: OrderService) { 
    this.order$ = this.socketService.onDisplayUpdate();
  }

  ngOnInit() {

  }

  completeOrder(order) {
    this.orderService.updateOrderStatus(order._id).subscribe(res => {
      console.log(res);
    })
  }

  trackByFn(i, order) {
    return order._id;
  }

}
