/** @jsxImportSource @emotion/react */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPinnedSubreddits, removePin } from '../../store/pinnedSubredditsSlice';
import styled from '@emotion/styled';
import { css } from '@emotion/react'; 
import { setSelectedSubreddit, selectSelectedSubreddit} from '../../store/postsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-regular-svg-icons';

export const PinnedSubredditsAside = () => {
    const dispatch = useDispatch();
    const pinnedSubreddits = useSelector(selectPinnedSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

    return (
        <PinnedAside>
            <h2
                css={css`
                    position: fixed;
                    margin: 20px;
                `}
            >
                Pinned Subreddits
            </h2>
            <PinnedList>
            {pinnedSubreddits.map((subreddit) => (
                <li 
                    key={subreddit.id}
                    css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        justify-content: space-around;
                    `}
                >
                    <SubredditButton 
                        onClick={() => dispatch(setSelectedSubreddit(subreddit))}
                        css={css`
                            border-left: 5px solid ${subreddit.color};
                        `}
                    >
                        <SubIcon src={
                                    subreddit.img ||
                                    `https://api.adorable.io/avatars/25/${subreddit.name}`
                                }
                                alt={`${subreddit.name}`}
                                css={css`
                                    background-color: ${subreddit.color ? subreddit.color : 'var(--fgcol1)'};
                                    border: ${selectedSubreddit === subreddit.url ? '5px solid ${subreddit.color}' : 'none'};
                                    transform: ${selectedSubreddit === subreddit.url ? 'scale(130%)' : 'scale(100%)'}
                                `}
                        />
                        <p>{subreddit.name}</p>
                    </SubredditButton>
                    <TrashButton 
                        onClick={() => dispatch(removePin(subreddit.url))}
                        css={css`
                                
                        `}
                    >
                            <FontAwesomeIcon icon={faTrash} fixedWidth />
                        </TrashButton>
                </li>
            ))}
            </PinnedList>
        </PinnedAside>
    )
}

const PinnedAside = styled.aside`
    margin: 0px auto 0px 0px;
    grid-area: 2, 1, 3, 2;
    width: 100%;
    @media (max-width: 1190px) {
        display: none;
    }
`

const PinnedList = styled.ul`
    padding: 20px 5px;
    margin-top: 40px;
    list-style-type: none;
    position: fixed;
    overflow: scroll;
    width: 300px;
    border-left: 10px solid var(--fgcol2);
`

const SubredditButton = styled.button`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 6px;
    font-size: 20px;
    border: none;
    color: var(--primaryfont);
    background-color: var(--fgcol2);
    border-radius: 0px 25px 25px 0px;
    box-shadow: 2px 2px 2px var(--shadows);
    transform: translateX(-10px);
    transition: 0.2s ease;
    &:hover {
        transform: translateX(0px);
    }
`

const TrashButton = styled.button`
    border: none;
    padding: 6px;
    font-size: 18px;
    border-radius: 50%;
    margin: 8px;
    color: var(--fgcol2);
    background-color: var(--secondaryfont);
    transition: 0.2s ease;
    box-shadow: 2px 2px 2px var(--shadows);
    &:hover {
        color: var(--secondaryfont);
        background-color: var(--fgcol2);
    }
`

const SubIcon = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 10px 16px;
    box-shadow: 2px 2px 2px var(--shadows);
`