import styled from "@emotion/styled";
import type { NextPage } from "next";
import { MainContent } from "../components/main_content/MainContent";
import { SideMenu } from "../components/side_menu/SideMenu";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { SocketEvents, Room } from "../utils/constants";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Home: NextPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    initSocket();
  }, []);

  const initSocket = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on(SocketEvents.new_user_connected, (rooms: Room[]) => {
      console.log("new connection rooms", rooms);
      setRooms(rooms);
    });
    socket.on(SocketEvents.emit_new_room, (room: Room) => {
      console.log("new room created room", room);
      setRooms([...rooms, room]);
    });
  };

  const createRoom = () => {
    console.log("creating new room");
    const roomName = `room ${rooms.length + 1}`;
    socket.emit(SocketEvents.create_room, roomName);
  };

  return (
    <MainPage>
      <SideMenu createRoom={createRoom} rooms={rooms} />
      <MainContent />
    </MainPage>
  );
};

export default Home;

const MainPage = styled.main`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
`;
