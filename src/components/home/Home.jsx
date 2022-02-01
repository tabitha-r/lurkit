/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectFilteredPosts, fetchComments } from '../../store/postsSlice';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Logo from '../../features/logo/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faSearch, faThumbtack } from '@fortawesome/pro-regular-svg-icons';
import { faThumbtack as pinnedSub } from '@fortawesome/pro-solid-svg-icons';
import Post from '../post/Post';
import { selectSelectedSubredditName, selectSelectedSubredditBanner, selectSelectedSubredditColor, selectSelectedSubredditIcon } from '../../store/postsSlice';
import { selectPinnedSubreddits, addPin, removePin } from '../../store/pinnedSubredditsSlice';

const Home = () => {
    const reddit = useSelector((state) => state.reddit);
    const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();
    const subredditName = useSelector(selectSelectedSubredditName);
    const subredditBanner = useSelector(selectSelectedSubredditBanner);
    const subredditColor = useSelector(selectSelectedSubredditColor);
    const pinnedSubreddits = useSelector(selectPinnedSubreddits);
    const subredditIcon = useSelector(selectSelectedSubredditIcon);

    const subredditIsPinned = () => {
        let result = false;
        for (let i = 0; i < pinnedSubreddits.length; i++) {
            if (pinnedSubreddits[i].url === selectedSubreddit) {
                result = true;
                break;
            } else {
                result = false;
            }
        }
        return result;
    };
    

    const onTogglePin = () => {
        if (subredditIsPinned()) {
            dispatch(removePin(selectedSubreddit));
        } else {
            dispatch(addPin({
                url: selectedSubreddit,
                color: subredditColor,
                name: subredditName,
                img: subredditIcon,
            }));
        }
    };

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit, dispatch]);

    const onToggleComments = (index) => {
        const getComments = (link) => {
            dispatch(fetchComments(index, link));
        };

        return getComments;
    }

    if (isLoading) {
        const fontSize = '80px';

        return (
            <Logo fontSize={fontSize} repeat='true' />
        );
    }

    if (error) {
        return (
            <ErrorBox>
                <FontAwesomeIcon icon={faFrown} />
                <h2>Uh Oh!</h2>
                <p>Looks like the posts are lurking too...</p>
                <button
                    type="button"
                    onClick={() => dispatch(fetchPosts(selectedSubreddit))}
                >
                    Try again
                </button>
            </ErrorBox>
        )
    }

    if (posts.length === 0) {
        return (
            <ErrorBox>
                <FontAwesomeIcon icon={faSearch} />
                <h2>Nothing Found</h2>
                <p>Doesn't seem to be any posts that match that...</p>
            </ErrorBox>
        )
    }

    return (
        <MainContent>
            <div
                css={css`
                    display: flex;
                    align-items: center;
                    & > h2 {
                        font-size: 40px;
                        margin-left: 32px;
                    }
                `}
            >
                <img 
                    src={subredditBanner}
                    css={css`
                        max-height: 100px;
                    `}    
                />
                <h2>{subredditName}</h2>
                <button
                    css={css`
                        background-color: transparent;
                        border: none;
                        color: var(--primaryfont);
                        font-size: 40px;
                        margin-left: auto;
                        transition: 0.2s ease;
                        &:hover {
                            transform: scale(150%);
                        }
                        @media (max-width: 1190px) {
                            display: none;
                        }
                    `}
                    onClick={() => onTogglePin()}
                >
                    {subredditIsPinned() ? <FontAwesomeIcon icon={pinnedSub} /> : <FontAwesomeIcon icon={faThumbtack} />}
                </button>
            </div>
            <div
                css={css`
                    display: flex;
                    flex-flow: row wrap;
                    width: 100%;
                    align-items: flex-start;
                `}
            >
                {posts.map((post, index) => (
                    <Post 
                        key={post.id}
                        post={post}
                        onToggleComments={onToggleComments(index)}
                        subColor={subredditColor}
                    />
                ))}
            </div>
        </MainContent>
    )
}

export default Home;

const ErrorBox = styled.div`
    text-align: center;
    background-color: var(--fgcol1);
    box-shadow: 2px 2px 2px var(--shadows);
`

const MainContent = styled.main`
    padding: 32px;
    grid-area: 1, 1, 2, 2;
`