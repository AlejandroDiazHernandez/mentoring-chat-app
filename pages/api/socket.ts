// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Server, Socket } from "socket.io";
import type { NextApiRequest } from "next";

import { SocketEvents, Room, User } from "../../utils/constants";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type socket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

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

  // Create socket server
  const io = new Server(res.socket?.server);
  res.socket.io = io;

  const socketInitialation = (socket: socket) => {
    const user = {
      id: socket.id,
      name: `user_${users.length}`,
    }
    socket.data.username = user.name;
    users.push(user);
    rooms[0].participants.push(user);
    socket.join(DEFAULT_ROOM);

    // Defining socket events
    socket.emit(SocketEvents.new_user_connected, rooms);
    socket.on(SocketEvents.create_room, (roomName: string) => {
      const room = { name: roomName, participants: [] };
      rooms.push(room);
      socket.join(roomName);
      io.emit(SocketEvents.emit_new_room, rooms);
    });
  }

  io.on("connection", socketInitialation);
  res.end();
}
