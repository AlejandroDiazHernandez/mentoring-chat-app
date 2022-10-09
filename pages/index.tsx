import styled from '@emotion/styled'
import type { NextPage } from 'next'
import { MainContent } from '../components/main_content/MainContent'
import { SideMenu } from '../components/side_menu/SideMenu'

const Home: NextPage = () => {
  return (
    <MainPage>
      <SideMenu />
      <MainContent />
    </MainPage>
  )
}

export default Home

const MainPage = styled.main`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
`
