import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { CHAT_URL, UserMessage } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, ChatService]
})
export class AppComponent {
  title = 'rxjs6';
  chat_url:string;
  public error_message:string ;
  wsResponse:string = '';
  connectionIsOpen = false;
  constructor(private chatService: ChatService) {
      this.justChat( chatService )
  }
  ngOnInit(){
    this.chat_url = this.chatService.chatUrl();
  }

  justChat(chatService: ChatService) {
    chatService.messages.subscribe(
      (msg: MessageEvent) => {
        let user_msg:UserMessage;
        try {

          user_msg = JSON.parse(msg.data);
          if (msg.type == 'message') {
            console.log("Response from server: ", msg );
            this.wsResponse = user_msg.author + ' - ' + user_msg.message + '\n' 
                            + this.wsResponse.substr( 0, 1000)
          } else {
            console.log("Response: ", msg)
            this.wsResponse += 'huh????' + msg;
          }
        } catch( e ) {
          console.error( "NOT JSON: ", msg.data )
          this.wsResponse = msg.data + '\n' 
                            + this.wsResponse.substr( 0, 1000)
        }
        
      },
      (err: Event) => {
        if (err.type == 'error') {
          console.log("ERROR with url: ", err.currentTarget['url'])
        } else {
          console.log("ERROR : ", err)
        }
        this.error_message = "ERROR with url: " + err.currentTarget['url'] + '. Is websocket server running???'
      },
      (a => { this.connectionIsOpen = false;  this.chatService.reconnect() ; console.log("COMPLETE") }));
  }

  public message:UserMessage = {
    author: 'ROB',
    message: 'this is a test message from the webclient to websocket'
  }


  sendMsg( ) {
    this.chatService.messages.next(this.message);
  }
}
