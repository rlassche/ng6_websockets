# Angular 11.x, rxjs 6.6.x and reconnecting WebSockets

Ported to Angular 11.

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

* Define the websocket endpoint in environment.ts 
 

* User Message
 
```
export interface UserMessage {
    author: string,
    message: string
}
```

# Perl

If you like Perl, then checkout my mojolicious perl application.

`https://github.com/rlassche/mojolicious_websockets`
