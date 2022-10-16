import styled from "@emotion/styled";
import React from "react";
import { Room } from "../../utils/constants";

export interface SideMenuProps {
  createRoom: () => void;
  rooms: Room[];
}

export const SideMenu = ({ createRoom, rooms }: SideMenuProps): JSX.Element => {
  return (
    <SideMenuContainer>
      <RoomListContainer>
        {rooms.map((room) => (
          <li key={room.name}>{room.name}</li>
        ))}
      </RoomListContainer>
      <SideMenuFooter>
        <button onClick={createRoom}>Añadir</button>
      </SideMenuFooter>
    </SideMenuContainer>
  );
};

const SideMenuContainer = styled.section`
  width: 30%;
  height: 100vh;
  background-color: palevioletred;
  display: flex;
  flex-direction: column;
  padding: var(--chakra-space-4);
`;

const RoomListContainer = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

const SideMenuFooter = styled.footer`
  margin-top: auto;
`;
