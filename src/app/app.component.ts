import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, ChatService]
})
export class AppComponent {
  title = 'rxjs6';
  connectionIsOpen = false;
  constructor(private chatService: ChatService) {
      this.justChat( chatService )
  }


  justChat(chatService: ChatService) {
    chatService.messages.subscribe(
      (msg: MessageEvent) => {
        //console.log("Response from server: ", msg.data);
        if (msg.type == 'message') {
          console.log("Response from server: ", msg.data);
        } else {
          console.log("Response: ", msg)
        }
      },
      (err: Event) => {
        if (err.type == 'error') {
          console.log("ERROR with url: ", err.currentTarget['url'])
        } else {
          console.log("ERROR : ", err)
        }
      },
      (a => { this.connectionIsOpen = false;  this.chatService.reconnect() ; console.log("COMPLETE") }));
  }

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message from the client'
  }

  sendMsg() {
    console.log('sendMsg: message from client to server: ', this.message);
    this.chatService.messages.next(this.message);
    this.message.message = '...gewist...';
  }
}
