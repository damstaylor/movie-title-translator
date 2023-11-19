import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import SearchDropdownInput from "./SearchDropdownInput";
import SearchDropdownPanel from "./SearchDropdownPanel";

const SearchInput = styled.input`
  background-color: ${props => (props.$primary ? '#4CAF50' : '#ffffff')};
  color: ${props => (props.$primary ? '#ffffff' : '#4CAF50')};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: ${props => (props.$primary ? '#45a049' : '#e7e7e7')};
  }
`;
const SearchResultsPanel = styled.div`
  position: absolute;
  top: 24px;
  background-color: #D4D4D4;
  width: auto;
  max-height: 300px;
`;

const SearchDropdown = ({value, items, handleSearchInput, handleItemSelect}) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (newVal) => {
    setSearchValue(newVal);
    handleSearchInput(newVal);
  };
  const handleItemClick = (item) => {
    handleItemSelect(item);
    setSearchValue('');
  };
  // useEffect(() => {
  //   setSearchValue(value);
  // }, [value]);
  return (
    <>
      <SearchDropdown.Input label="Search movie"
                            placeholder="Search movie title"
                            value={searchValue}
                            handleInput={handleSearch}
      />
      {searchValue.length > 0 ?
        <SearchDropdown.Panel items={items}
                              onClick={handleItemClick}
        /> :
        null}
    </>
  );
};

SearchDropdown.Input = SearchDropdownInput;
SearchDropdown.Panel = SearchDropdownPanel;

export default SearchDropdown;
