import { Application } from "./objects/application";
import {
    ArrayQueue,
    ConstantBackoff,
    Websocket,
    WebsocketBuilder,
    WebsocketEvent,
} from "websocket-ts";


import { WS_URL } from "./constants";

export class WebsocketManager {

    ws: Websocket;

    constructor () { 
        this.ws = new WebsocketBuilder(WS_URL)
            .withBackoff(new ConstantBackoff(100))
            .build();
        this.addListeners();
    }

    addListeners = () => {
        this.ws.addEventListener(WebsocketEvent.open, (i: Websocket) => console.log("opened!"));
        this.ws.addEventListener(WebsocketEvent.close, () => console.log("closed!"));
        this.ws.addEventListener(WebsocketEvent.message, (i: Websocket, ev: MessageEvent) => this.echoOnMessage(i, ev));
    }



    echoOnMessage = (i: Websocket, ev: MessageEvent) => {
        console.log(`received message: ${ev.data}`);
        try{
            const result = JSON.parse(ev.data);
            const applications: Application[] = [];
            result.forEach((value: object) => {
                applications.push(Object.assign(new Application(), value));
            });
        } catch (_) {}
        i.send(`echo: ${ev.data}`);
    }
}
