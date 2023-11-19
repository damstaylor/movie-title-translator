import PropTypes from 'prop-types';

const SearchDropdownInput = ({label, placeholder, value, handleInput}) => {
  return (
    <div className="SearchDropdownInput">
      {label ? <label>{label}</label> : null}
      <input type="text"
             placeholder={placeholder}
             value={value}
             onInput={(e) => { handleInput(e.target.value); }}
      />
    </div>
  );
};

SearchDropdownInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  handleInput: PropTypes.func,
  value: PropTypes.string,
};

export default SearchDropdownInput;
