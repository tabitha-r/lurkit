/** @jsxImportSource @emotion/react */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faRectanglePortrait } from '@fortawesome/pro-solid-svg-icons';
import { css, keyframes } from '@emotion/react';

const Logo = (props) => {
    const size = props.fontSize;
    const repeat = props.repeat;

    return (
        <div
            css={css`
                width: 70vw;
                height: 70vh;
                display: flex;
                align-items: center;
                justify-content: center;
            `}
        >
            <div
                css={css`
                    font-size: ${size};
                    overflow: hidden;
                    width: ${size};
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin: 10px 0px 10px 20px;
                `}
            >
                <FontAwesomeIcon 
                    icon={faRedditAlien} 
                    css={css`
                        transform: translateX(-10px);
                        animation: ${hide} 1.5s ease ${repeat ? 'infinite' : '1'};
                    `}
                />
                <FontAwesomeIcon 
                    icon={faRectanglePortrait}
                    css={css`
                        transform: translateX(-60px);
                        width: 10px;
                    `}
                />
            </div>
        </div>
    )
}

export default Logo;

const hide = keyframes`
    0%, 100% {
        transform: translate3d(-10px, 0px, 0) rotate(0deg);
    }
    50% {
        transform: translate3d(60px, 0px, 0) rotate(30deg);
    }
`