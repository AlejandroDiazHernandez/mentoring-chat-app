import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

import { useToast } from '@chakra-ui/react';
import { Room, SocketEvents } from '../utils/constants';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const useSocket = () => {
  const toast = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);

  const showToast = (name: string) => {
    toast({
      duration: 3000,
      title: 'New room created',
      description: name,
      status: 'info',
      isClosable: true,
      position: 'bottom-right',
    });
  };
  const newRoomCreated = (rooms: Room[]) => {
    const newRoom = rooms.at(-1);
    showToast(newRoom?.name || 'New Room');
    setRooms(rooms);
  };

  const initSocket = async () => {
    await fetch('/api/socket');
    socket = io();
    socket.on(SocketEvents.new_user_connected, setRooms);
    socket.on(SocketEvents.emit_new_room, newRoomCreated);
  };

  useEffect(() => {
    if (!socket) initSocket();
    return () => {
      if (socket) {
        socket.off(SocketEvents.disconnect);
        socket.close();
      }
    };
  }, []);

  const createRoom = (roomName: string) => {
    socket.emit(SocketEvents.create_room, roomName);
  };

  return { rooms, createRoom };
};
