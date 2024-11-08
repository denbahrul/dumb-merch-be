import { Message } from "@/dto/chat.dto";
import { OrderDTO } from "@/dto/order.dto";
import { prisma } from "@/libs/prisma";

class OrderRepositories {
  async createChat(chatDto: Message, roomId: number) {
    const { message, userId } = chatDto;

    return await prisma.message.create({
      data: {
        content: message,
        userId: +userId,
        roomId: +roomId,
      },
    });
  }

  async findChatRoom(roomId: string) {
    return await prisma.chatRoom.findUnique({
      where: {
        name: `${roomId}`,
      },
    });
  }

  async createRoom(roomId: string, userIds: number[]) {
    return await prisma.chatRoom.create({
      data: {
        name: `${roomId}`,
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
    });
  }

  async getAllChatRoom() {
    return await prisma.chatRoom.findMany();
  }
  async getChatByChatRoom(roomId: string) {
    return await prisma.message.findMany({
      where: {
        chatRoom: {
          name: roomId,
        },
      },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: {
            profile: {
              select: {
                fullName: true,
                profilePhoto: true,
              },
            },
          },
        },
      },
    });
  }
}

export default new OrderRepositories();
