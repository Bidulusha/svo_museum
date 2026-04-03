import { Application } from "../objects/application";
import {
    ArrayQueue,
    ConstantBackoff,
    Websocket,
    WebsocketBuilder,
    WebsocketEvent,
} from "websocket-ts";


import { WS_URL } from "../constants";

export class WebsocketManager {

    ws: Websocket;

    constructor () { 
        this.ws = new WebsocketBuilder(WS_URL)
            .withBackoff(new ConstantBackoff(1000))
            .build();
        // this.addListeners();
    }

    setupListeners = (echoOnMessage: Function) => {
        this.ws.addEventListener(WebsocketEvent.open, (i: Websocket) => console.log("opened!"));
        this.ws.addEventListener(WebsocketEvent.close, () => console.log("closed!"));
        this.ws.addEventListener(WebsocketEvent.message, (i: Websocket, ev: MessageEvent) => echoOnMessage(i, ev));
    }



    // echoOnMessage = (i: Websocket, ev: MessageEvent): MessageType => {
    //     console.log(`received message: ${ev.data}`);
    //     try{
    //         const result: object = JSON.parse(ev.data);
    //         const application: Application = Object.assign(new Application(), result);
    //         console.log(application);
    //     } catch (_) { }
    //     i.send(`echo: ${ev.data}`);
    // }
}
