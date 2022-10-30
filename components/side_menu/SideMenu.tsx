import { useDisclosure, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { ModalComponent } from '../shared/Modal';
import { Room } from '../../utils/constants';

export interface SideMenuProps {
  createRoom: (roomName: string) => void;
  rooms: Room[];
}

const useCreateModal = (createRoom: (roomName: string) => void) => {
  const [roomName, setRoomName] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const launchModal = () => onOpen();

  const handleCreateRoom = () => {
    createRoom(roomName);
    setRoomName('');
    onClose();
  };

  return {
    launchModal,
    isOpen,
    onClose,
    handleCreateRoom,
    roomName,
    setRoomName,
  };
};

export const SideMenu = ({ createRoom, rooms }: SideMenuProps): JSX.Element => {
  const {
    launchModal,
    isOpen,
    onClose,
    handleCreateRoom,
    roomName,
    setRoomName,
  } = useCreateModal(createRoom);

  return (
    <SideMenuContainer>
      <RoomListContainer>
        {rooms.map((room) => (
          <li key={room.name}>{room.name}</li>
        ))}
      </RoomListContainer>
      <SideMenuFooter>
        <button onClick={launchModal}>Añadir</button>
      </SideMenuFooter>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title="Create Room"
        mainAction={handleCreateRoom}
        actionButton="Create">
        <Input
          placeholder="room name.."
          value={roomName}
          onChange={({ target }) => setRoomName(target.value)}
        />
      </ModalComponent>
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
