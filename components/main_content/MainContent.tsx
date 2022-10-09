import styled from "@emotion/styled";
import React from "react";

export const MainContent = (): JSX.Element => {
  return (
    <MainContentContainer>
      <MainContentHeader>
        <p>HEADER</p>
      </MainContentHeader>
      <MainContentArticle>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </MainContentArticle>
      <MainContentFooter>
        FOOTER
      </MainContentFooter>
    </MainContentContainer>
  );
};

const MainContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: steelblue;
  padding: var(--chakra-space-4);
`

const MainContentHeader = styled.header`
  height: var(--chakra-space-14);
`

const MainContentArticle = styled.article`
  height: 100%;
`

const MainContentFooter = styled.footer`
  margin-top: auto;
`