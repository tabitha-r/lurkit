/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import Logo from '../../features/logo/logo';
import SchemeSwitch from '../../features/darkMode/schemeSwitch';
import { css } from '@emotion/react';

const Header = () => {
    const fontSize = '50px';

    return (
        <MainHeader>
            <Logo fontSize={fontSize} />
            <Title>Lurkit</Title>
            <SchemeSwitch />
            <div 
                css={css`
                    width: 32px;
                `}
            />
        </MainHeader>
    )
}

export default Header;

const MainHeader = styled.header`
    display: flex;
    height: 80px;
    align-items: center;
    box-shadow: 0px 1px 6px var(--shadows);
    position: fixed;
    width: 100vw;
    background-color: var(--fgcol1);
    flex-flow: row nowrap;
    z-index: 5;
`


const Title = styled.h1`
    font-family: 'Nunito', sans-serif;
    text-transform: lowercase;
    padding: 5px 10px;
    margin-right: auto;
`