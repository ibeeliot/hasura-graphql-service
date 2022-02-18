import React from 'react';
import styled from '@emotion/styled';
import { Input, Button } from './shared/Form';

const SearchForm = styled.div`
display: flex;
align-items: center;
>button {
    margin-left: 1rem;
}
`;

const Search = ({ onChange, inputVal, onSearch}) => {
    return (
        <SearchForm>
            <Input onChange={onChange} value={ inputVal } />
            <Button onClick={onSearch}> Search </Button>
        </SearchForm>
    )
}

export default Search;