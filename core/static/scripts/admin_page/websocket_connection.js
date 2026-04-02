import { ArrayQueue, ConstantBackoff, WebsocketBuilder, WebsocketEvent, } from "websocket-ts";
export const ws = new WebsocketBuilder("ws://localhost:8080/api/admin_page_ws")
    .withBuffer(new ArrayQueue())
    .withBackoff(new ConstantBackoff(1000))
    .build();
const echoOnMessage = (i, ev) => {
    console.log(`received message: ${ev.data}`);
    i.send(`echo: ${ev.data}`);
};
ws.addEventListener(WebsocketEvent.open, () => console.log("opened!"));
ws.addEventListener(WebsocketEvent.close, () => console.log("closed!"));
ws.addEventListener(WebsocketEvent.message, echoOnMessage);
//# sourceMappingURL=websocket_connection.js.map