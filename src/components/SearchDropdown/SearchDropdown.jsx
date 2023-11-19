import React, {useState} from 'react';
import SearchDropdownInput from "./SearchDropdownInput";
import SearchDropdownPanel from "./SearchDropdownPanel";

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
