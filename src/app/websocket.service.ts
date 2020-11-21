import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import ReconnectingWebSocket from 'reconnecting-websocket'
import { environment } from '../environments/environment';

export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable()
export class WebsocketService {
  private subject;
  private myWebSocket;
  private options = {
    minReconnectionDelay: 1000,
    maxEnqueuedMessages: 10,
    maxRetries: 3,
    debug: false
  }

  connect() {
    if( this.subject != null ) {
      return this.subject;
    }

    this.subject = new Subject<any>( ) ;

    this.myWebSocket = new ReconnectingWebSocket( WS_ENDPOINT, [], this.options )
    this.myWebSocket.addEventListener( 'open', () => {
      console.log( 'event listener open')
    })
    this.myWebSocket.addEventListener( 'message', (m) => {
      console.log( 'event listener message', m.data)
      this.subject.next( m.data );
    })
    this.myWebSocket.addEventListener( 'error', (e) => {
      console.log( 'event listener error', e)
    })
    this.myWebSocket.addEventListener( 'close', (e) => {
      console.log( 'event listener close', e)
    })

    return this.subject;
  }
 
  sendMsg(msg) {
    this.myWebSocket.send( JSON.stringify(msg) );
  }
}