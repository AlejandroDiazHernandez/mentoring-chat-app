import styled from "@emotion/styled";
import type { NextPage } from "next";

import { MainContent } from "../components/main_content/MainContent";
import { SideMenu } from "../components/side_menu/SideMenu";
import { useSocket } from "../hooks/useSocket";

const Home: NextPage = () => {
  const { createRoom, rooms } = useSocket();
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
