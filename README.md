# Angular 7.2.4, rxjs 6.4.0 and WebSockets 

I copied the code from ??? (forgotten, sorry) and modified it for Angular7.

The software uses a demo websocket server at `ws://echo.websocket.org/` over http or https.

A user message has two fields:

# Implementation

## Service `WebsocketService` 

* Subject
 
A subject is an observable and an observer at the same time and comes with rxjs. Subjects behave like EventEmitters.

* Imports

`import { Observable, Observer, Subject } from 'rxjs';`

* Define the private subject variable

`private subject: Subject<MessageEvent>;`

* The service will return the Subject object

`return Subject.create(observer, observable);`

## Configuration

* File `config.ts`:

* Define the websocket endpoint: 
 
`export const CHAT_URL = 'wss://hp-probook:9443/echo/'`

* User Message
 
```
export interface UserMessage {
    author: string,
    message: string
}
```

# Alternative angular websocket

Use  `https://github.com/afrad/angular2-websocket`. Works really fine with Angular 6!


# Perl

If you like Perl, then checkout my mojolicious perl application.

`https://github.com/rlassche/mojolicious_websockets`
