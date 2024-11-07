import { Socket, Server } from "socket.io";

interface Message {
  message: string;
  username: string;
  userId: number;
  //   receiverId: number
  roomId: string;
}

const idAdmin = "2";
const chatUsers: string[] = [];
let socketAdmin: Socket;
const chatMessages: Record<string, Message[]> = {};

export const socketHandler = (socket: Socket, io: Server) => {
  const userId = socket.handshake.query.userId as string;
  console.log("user Id " + userId + " connected");

  if (userId.toString() !== idAdmin) {
    chatUsers.push(userId as string);
    socket.join(`${userId}${idAdmin}`);
    socket.emit("connected", { rooms: [`${userId}${idAdmin}`] });
    if (socketAdmin) {
      socketAdmin.join(`${userId}${idAdmin}`);
    }
  } else {
    socketAdmin = socket;
    const listRooms = chatUsers.map((user) => `${user}${idAdmin}`);
    socketAdmin.join(listRooms);
    socketAdmin.emit("connected", { rooms: [...new Set(listRooms)] });
  }

  //    when user connected send room details

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });

  socket.on("getChats", (data) => {
    const { roomId } = data;

    io.to(roomId).emit("fullChats", chatMessages[roomId]);
  });

  socket.on("sendChat", (data: Message) => {
    const { roomId } = data;

    if (!chatMessages[roomId]) {
      chatMessages[roomId] = [];
    }

    chatMessages[roomId].push(data);

    io.to(roomId).emit("receiveChats", data);
  });
};
