import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { UserMessage } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService ]
})
export class AppComponent {
  title = 'Reconnecting webSockets';
  public error_message:string ;
  wsResponse:string = '';

  constructor(private wsService: WebsocketService ) {
      wsService.connect()
        .subscribe(
        (data) =>{
          this.wsResponse = data + '\n' 
                            + this.wsResponse.substr( 0, 1000)
        }
      ) ;
  }

  public message:UserMessage = {
    author: 'ROB',
    message: 'this is a test message from the webclient to websocket'
  }

  sendMsg( ) {
    this.wsService.sendMsg( this.message );
  }
}
