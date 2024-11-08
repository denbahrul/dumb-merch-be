import { Message } from "@/dto/chat.dto";
import { prisma } from "@/libs/prisma";
import chatRepositories from "@/repositories/chat.repositories";
import { Socket, Server } from "socket.io";

const idAdmin = "2";
const chatUsers: string[] = [];
let socketAdmin: Socket;
const chatMessages: Record<string, Message[]> = {};

export const socketHandler = async (socket: Socket, io: Server) => {
  const chatRooms = await chatRepositories.getAllChatRoom();
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
    const listRooms = chatRooms.map((room) => room.name);
    socketAdmin.join(listRooms);
    socketAdmin.emit("connected", { rooms: [...new Set(listRooms)] });
  }

  //    when user connected send room details

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });

  socket.on("getChats", async (data) => {
    const { roomId } = data;
    console.log(roomId);

    const message = await chatRepositories.getChatByChatRoom(roomId);

    console.log(message);

    io.to(roomId).emit("fullChats", message);
    // io.to(roomId).emit("fullChats", chatMessages[roomId]);
  });

  socket.on("sendChat", async (data: Message) => {
    let existingRoom = await chatRepositories.findChatRoom(data.roomId);

    if (!existingRoom) {
      existingRoom = await chatRepositories.createRoom(data.roomId, [+userId, 2]);
    }

    const savedMessage = await chatRepositories.createChat(data, existingRoom.id);
    // const { roomId } = data;

    // if (!chatMessages[roomId]) {
    //   chatMessages[roomId] = [];
    // }

    // chatMessages[roomId].push(data);

    io.to(data.roomId).emit("receiveChats", savedMessage);
  });
};
