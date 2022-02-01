import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectFilteredPosts } from '../../store/postsSlice';
import styled from '@emotion/styled';

const SearchBar = () => {
    const dispatch = useDispatch();
    const filteredPosts = useSelector(selectFilteredPosts);

    return (
        <>
            <searchInput
                type="text"
                placeholder="search"
            >
                
            </searchInput>
        </>
    )
}

export default SearchBar;

const searchInput = styled.input`
    margin-top: 500px;
`