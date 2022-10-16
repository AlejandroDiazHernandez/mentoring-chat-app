import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Room, SocketEvents } from "../utils/constants";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const useSocket = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const initSocket = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on(SocketEvents.new_user_connected, setRooms);
    socket.on(SocketEvents.emit_new_room, setRooms);
  };

  useEffect(() => {
    if(!socket) initSocket();
    return () => {
      if(socket) {
        socket.off(SocketEvents.disconnect);
        socket.close();
      }
    }
  }, []);

  const createRoom = () => {
    const roomName = `room ${rooms.length + 1}`;
    socket.emit(SocketEvents.create_room, roomName);
  };

  return {rooms, createRoom}
}