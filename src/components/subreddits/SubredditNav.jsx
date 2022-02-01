/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits, selectSubreddits } from '../../store/subredditsSlice';
import { setSelectedSubreddit, selectSelectedSubreddit} from '../../store/postsSlice';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useHorizontalScroll } from '../../features/functions';

const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    

    const scrollRef = useHorizontalScroll();

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    return (
        <SubNav>
            <IconScroll ref={scrollRef} className='horizontal-scroll'>
                {subreddits.map((subreddit) => (
                    <li key={subreddit.id}>
                        <SubredditButton onClick={() => dispatch(setSelectedSubreddit(subreddit))}>
                            <SubredditIcon
                                src={
                                    subreddit.icon_img ||
                                    `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                                }
                                alt={`${subreddit.display_name}`}
                                css={css`
                                    background-color: ${subreddit.primary_color};
                                    border: ${selectedSubreddit === subreddit.url ? '5px solid var(--secondaryfont)' : 'none'};
                                    transform: ${selectedSubreddit === subreddit.url ? 'scale(130%)' : 'scale(100%)'}
                                `}
                            />
                        </SubredditButton>
                    </li>
                ))}
            </IconScroll>
        </SubNav>
    )
}

export default Subreddits;

const SubNav = styled.nav`
    padding-top: 80px;
    width: 100vw;
    position: fixed;
    z-index: 1;
    background-color: var(--bgcol);
`

const IconScroll = styled.ul`
    display: flex;
    flex-flow: row nowrap;
    overflow-x: scroll;
    list-style-type: none;
    align-items: center;
    width: 100%;
    height: 100px;
`

const SubredditIcon = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    margin: 10px 12px;
    box-shadow: 2px 2px 2px var(--shadows);
    background-color: var(--fgcol1);
    transition: 0.2s ease;
    &:hover {
        transform: scale(125%);
    }
`

const SubredditButton = styled.button`
    border: none;
    background-color: transparent;
`