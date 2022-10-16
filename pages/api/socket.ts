// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { Server } from "socket.io";
import { SocketEvents, Room, User } from "../../utils/constants";

const DEFAULT_ROOM = "General";
const rooms: Room[] = [{
  name: DEFAULT_ROOM,
  participants: [],
}];
const users: User[] = [];

export default function handler(req: NextApiRequest, res: any) {
  if (res.socket?.server?.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket?.server);
  res.socket.io = io;

  io.on("connection", (socket) => {

    socket.data.username = `user_${users.length}`;
    const user = {
      id: socket.id,
      name: socket.data.username,
    }
    users.push(user);
    rooms[0].participants.push(user);
    socket.join(DEFAULT_ROOM);
    socket.emit(SocketEvents.new_user_connected, rooms);
    socket.on(SocketEvents.create_room, (roomName: string) => {
      const room = { name: roomName, participants: [] };
      rooms.push(room);
      socket.join(roomName);
      io.emit(SocketEvents.emit_new_room, rooms);
    });
  });
  res.end();
}
