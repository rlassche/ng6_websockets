import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import { CHAT_URL, UserMessage } from './config';


@Injectable()
export class ChatService {
  public messages

  private chat_url;
  constructor(private wsService: WebsocketService) {
    this.chat_url = this.chatUrl(); 
    this.messages = <Subject<MessageEvent>>wsService
      .connect(this.chat_url)
  }

  reconnect() {
    this.messages = <Subject<MessageEvent>>this.wsService
      .connect(this.chat_url)
  }
  chatUrl ():string {
    console.log( 'location.hostname: ', location.hostname)
    console.log( 'location.protocol: ', location.protocol)
    console.log( 'location.port: ', location.port)
    console.log( 'location.*: ', location)
    let protocol = 'wss:'
    let hostname = location.hostname
    let port = 3001
    let wsEndpointName = '/echo'
    if( location.protocol == 'http:') {
        protocol = 'ws:'
        // Always use port 3001
        //port = 3000;

    }
    this.chat_url = protocol + '//' + hostname + ':'+port + wsEndpointName;
    this.chat_url = "wss://www.mijn-hobbies.nl:3001/echo"
    console.log( "calc. chat_url: ", this.chat_url)
    return this.chat_url;
  }
}