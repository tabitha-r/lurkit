import React from 'react';
import styled from '@emotion/styled';

const Avatar = (props) => {
    const { name } = props;

    return (
        <AvatarImg 
            src={`https://api.adorable.io/avatars/10/${name}`}
            alt={`${name} profile`}
        />
    );
};

export default Avatar;

const AvatarImg = styled.img`
    border-radius: 50%;
    background-colour: var(--switches);
    boz-shadow: 2px 2px 2px var(--shadows);
    height: 20px;
    width: 20px;
`