// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { Server } from "socket.io";
import { SocketEvents, Room } from "../../utils/constants";

const rooms: Room[] = [];

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket?.server?.io) {
    const io = new Server(res.socket?.server);
    res.socket.io = io;
    io.on("connection", (socket) => {
      socket.on(SocketEvents.create_room, (roomName: string) => {
        const room = { name: roomName, participants: [] };
        rooms.push(room);
        socket.broadcast.emit(SocketEvents.emit_new_room, rooms);
      });
      socket.emit(SocketEvents.new_user_connected, rooms);
    });
  }
  res.end();
}
