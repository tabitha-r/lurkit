import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../store/darkModeSlice';
import './schemeSwitch.css';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoonStars } from '@fortawesome/pro-regular-svg-icons';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../store/darkModeSlice';

const SchemeSwitch = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(selectDarkMode);
    
    return (
        <>
            <input 
                className='react-switch-checkbox'
                type="checkbox" 
                onChange={() => dispatch(toggleDarkMode())}
                id={'dark-mode-switch'}
            />
            <LabelColour
                className='react-switch-label'
                htmlFor={'dark-mode-switch'}
            >
                <SwitchIcons className={'react-switch-button'}>
                    {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoonStars} />}  
                </SwitchIcons>
            </LabelColour>
        </>
    );
};

export default SchemeSwitch;

const LabelColour = styled.label`
    background-color: var(--switches);
`

const SwitchIcons = styled.span`
    color: #000;

    &:active {
        transform: rotate(180deg);
    }
`
