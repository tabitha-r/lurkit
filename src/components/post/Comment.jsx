import React from 'react';
import moment from 'moment'
import ReactMarkdown from 'react-markdown';
import Avatar from './Avatar';
import styled from '@emotion/styled';

const Comment = (props) => {
    const { comment } = props;
    return (
        <CommentContainer>
            <Avatar name={comment.author} />
            <CommentData>
                <p><strong>{comment.author}</strong> - {moment.unix(comment.created_utc).fromNow()}</p>
                <ReactMarkdown source={comment.body} />
            </CommentData>
        </CommentContainer>
    )
}

export default Comment;

const CommentContainer = styled.div`

`

const CommentData = styled.div`

`