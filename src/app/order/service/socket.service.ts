import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() {
  }

  onDisplayUpdate() {
    return new Observable((observer) => {
      // Get the next and error callbacks. These will be passed in when
      // the consumer subscribes.
      var socket = socketIo(environment.orderNamespace);
      var next = function(...args) {
        observer.next(...args);
      }

      var error = function(...args) {
        observer.error(...args);
      }
     
      var unsubscribe = () => {
        socket.disconnect();
      }
      // Simple geolocation API check provides values to publish
      socket.on('displayupdate', next);
      socket.on("error", (err) => {
        error(err);
        unsubscribe();
      });
     
      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {unsubscribe};
    });
  }
}
