import React, {useState} from 'react';
import SearchDropdownInput from './SearchDropdownInput';
import SearchDropdownPanel from './SearchDropdownPanel';
import PropTypes from 'prop-types';
import './SearchDropdown.css';

const SearchDropdown = ({value, items, handleSearchInput, handleItemSelect}) => {
  const [selectedItem, setSelectedItem] = useState(value || null);
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (newVal) => {
    setSearchValue(newVal);
    handleSearchInput(newVal);
  };
  const cancelSearch = () => {
    setSelectedItem(null);
    setSearchValue('');
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    handleItemSelect(item);
    cancelSearch();
  };
  return (
    <div className="SearchDropdown relative">
      <SearchDropdown.Input placeholder="Search movie title"
                            value={searchValue}
                            onInput={handleSearch}
                            onCancel={cancelSearch}
      />
      {searchValue.length > 0 &&
        <SearchDropdown.Panel items={items}
                              onClick={handleItemClick}
        />
      }
    </div>
  );
};

SearchDropdown.propTypes = {
  value: PropTypes.object,
  items: PropTypes.array,
  handleSearchInput: PropTypes.func,
  handleItemSelect: PropTypes.func,
};

SearchDropdown.Input = SearchDropdownInput;
SearchDropdown.Panel = SearchDropdownPanel;

export default SearchDropdown;
