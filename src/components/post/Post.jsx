/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import moment from 'moment';
import Comment from './Comment';
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltUp, faArrowAltDown, faFrown, faComments } from '@fortawesome/pro-regular-svg-icons';
import { faArrowAltUp as upvote, faArrowAltDown as downvote } from '@fortawesome/pro-solid-svg-icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Logo from '../../features/logo/loading';

const Post = (props) => {
    const [voteValue, setVoteValue] = useState(0);

    const { post, onToggleComments, subColor } = props;

    const onHandleVote = (newValue) => {
        if (newValue === voteValue) {
        setVoteValue(0);
        } else if (newValue === 1) {
        setVoteValue(1);
        } else {
        setVoteValue(-1);
        }
    };

    const renderUpvote = () => {
        if (voteValue === 1) {
            return <FontAwesomeIcon icon={upvote} css={css`color: #7192fb`} />
        } else {
            return <FontAwesomeIcon icon={faArrowAltUp} />
        }
    };

    const renderDownvote = () => {
        if (voteValue === -1) {
            return <FontAwesomeIcon icon={downvote} css={css`color: #fd4304`} />
        } else {
            return <FontAwesomeIcon icon={faArrowAltDown} />
        }
    };

    const getVoteType = () => {
        if (voteValue === 1) {
            return 'up-vote';
        } else if (voteValue === -1) {
            return 'down-vote';
        } else {
            return '';
        }     
    };

    const renderComments = () => {
        if (post.errorComments) {
            return (
                <CommentError>
                    <FontAwesomeIcon icon={faFrown} />
                    <h3>Crab Emoji, Comments Gone</h3>
                </CommentError>
            );
        }

        if (post.loadingComments) {
            const fontSize = '80px';

            return (
                <Logo fontSize={fontSize} repeat='true' />
            );
        }

        if (post.showingComments) {
            return (
                <div>
                    {post.comments.map((comment) => (
                        <Comment comment={comment} key={comment.id} />
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <article key={post.id}>
            <PostContainer
                css={css`
                    border-top: 5px solid ${subColor ? subColor : 'var(--primaryfont)'};
                `}
            >
                <img src={post.url} alt=""
                    css={css`
                        width: 100%;
                        height: auto;
                        box-shadow: 0px 2px 2px var(--shadows);
                    `}
                />
                <div
                    css={css`
                        display: flex;
                        flex-flow: row nowrap;
                    `}
                >
                    <VoteContainer>
                        <button
                            onClick={() => onHandleVote(1)}
                        >
                            {renderUpvote()}
                        </button>
                        <p className={`post-votes-value ${getVoteType()}`}>
                        </p>
                        <button
                            onClick={() => onHandleVote(-1)}
                        >
                            {renderDownvote()}
                        </button>
                    </VoteContainer>
                    <PostContent>
                        <h3
                            css={css`
                                font-weight: 400;
                            `}
                        >{post.title}</h3>
                        <div>
                            <Avatar name={post.author} />
                            <p><strong>{post.author}</strong> - {moment.unix(post.created_utc).fromNow()}</p>
                        </div>
                    </PostContent>
                    <button 
                        onClick={() => onToggleComments(post.permalink)}
                        css={css`
                            margin: 32px;
                            margin-left: auto;
                            font-size: 20px;
                            background-color: transparent;
                            border: none;
                            color: var(--secondaryfont);
                            transition: 0.2s ease;
                            transform: ${post.showingComments ? 'scale(200%)' : 'scale(100%)'};
                            &:hover {  
                                transform: scale(200%);
                            }
                            @media (max-width: 450px) {
                                display: none;
                            }
                        `}    
                    >
                        <FontAwesomeIcon icon={faComments} />
                    </button>
                </div>
                <PostComments>
                        {renderComments()}
                </PostComments>
            </PostContainer>
        </article>
    )

}

export default Post;

const CommentError = styled.div`

`

const PostContainer = styled.div`
    background-color: var(--fgcol2);
    max-width: 600px;
    min-width: 100px;
    min-height: 150px;
    padding-bottom: 20px;
    margin: 32px;
    box-shadow: 2px 2px 2px var(--shadows);
    border-radius: 0px 0px 25px 25px;
    @media (max-width: 1190px) {
        width: 95%;
        margin: 32px 0px;
        max-width: 95%;
        min-width: 95%;
    }
`

const VoteContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    & > button {
        font-size: 30px;
        margin: 8px 32px;
        background-color: transparent;
        border: none;
        color: var(--secondaryfont);
        transition: 0.2s ease;
        &:hover {
            transform: scale(150%);
        }   
    }
    @media (max-width: 450px) {
        display: none;
    }
    
`

const PostContent = styled.div`
    padding: 16px;
`

const PostComments = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    width: 100%;
`