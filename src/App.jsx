import React from 'react';
import Header from './components/header/Header';
import { Global, css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './store/darkModeSlice';
import Subreddits from './components/subreddits/SubredditNav';
import { PinnedSubredditsAside } from './components/subreddits/pinnedSubreddits';
import Home from './components/home/Home';
import styled from '@emotion/styled';

function App() {
  const darkMode = useSelector(selectDarkMode);
  
  return (
    <div className="App">
      <Global 
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          :root {
            --bgcol: ${darkMode ? '#181719' : '#f4f2f7'};
            --fgcol1: ${darkMode ? '#27242c' : '#fff'};
            --fgcol2: ${darkMode ? '#3d3a41' : '#f9f9f9'};
            --primaryfont: ${darkMode ? '#fff' : '#27242c'};
            --secondaryfont: ${darkMode ? '#f3f3f9' : '#8a8a8e'};
            --shadows: ${darkMode ? '#0a0a0b' : '#3d3a41'};
            --switches: ${darkMode ? '#413c49' : '#e6e6e6'}
          }
          body {
            background-color: var(--bgcol);
            color: var(--primaryfont);
            font-family: Verdana, sans-serif;
          }
          .horizontal-scroll::-webkit-scrollbar {
            height: 2px;
            color: var(--fgcol1);
          }
          h1, h2 {
            font-family: 'Nunito', sans-serif;
            text-transform: lowercase;
          }
        `}
      />
      <Header />
      <Subreddits />
      <Content>
        <Home />
        <PinnedSubredditsAside />
      </Content>
      <footer>
      </footer>
    </div>
  );
}

export default App;

const Content = styled.div`
  padding: 180px 0px 0px 0px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: 0px;
  width: 100vw;
  @media (max-width: 1190px) {
    grid-template-columns: 1fr;
  }
`
