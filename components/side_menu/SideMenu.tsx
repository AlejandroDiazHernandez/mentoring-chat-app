import styled from "@emotion/styled";
import React from "react";

export const SideMenu = (): JSX.Element => {
  return (
    <SideMenuContainer>
      <RoomListContainer>
        <li>Primero</li>
        <li>Segundo</li>
        <li>Tercero</li>
      </RoomListContainer>
      <SideMenuFooter>
        <button type="button">Añadir</button>
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
`

const RoomListContainer = styled.ul`
  height: 100%;
  overflow-y: auto;
`

const SideMenuFooter = styled.button`
  margin-top: auto;
`