import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const SearchDropdownInput = ({label, placeholder, value, onInput, onCancel}) => {
  return (
    <div className="SearchDropdownInput">
      {label ? <label>{label}</label> : null}
      <input type="text"
             placeholder={placeholder}
             value={value}
             onInput={(e) => { onInput(e.target.value); }}
             className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      {value.length > 0 && (
        <button
          onClick={onCancel}
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};

SearchDropdownInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onInput: PropTypes.func,
  value: PropTypes.string,
};

export default SearchDropdownInput;
