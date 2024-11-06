import { IncomingMessage, ServerResponse } from "http";
import { Http2Server } from "http2";
import { Server } from "socket.io";

export let io: Server;

export const ioServer = (server: Http2Server<typeof IncomingMessage, typeof ServerResponse>) => {
  const ioServer = new Server(server);
  io = ioServer;
};
