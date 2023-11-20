import PropTypes from 'prop-types';

const SearchDropdownPanel = ({items = [], onClick}) => {
  return (
    <div className="relative z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
      {items.length > 0 ?
        <ul className="py-2">
          {items.map((item, index) => (
            <li key={index}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => onClick(item)}
            >
              <img src={item.img}
                   alt={item.title}
                   className="w-8 h-8 mr-2 rounded-full object-cover"
              />
              <div>
                <span className="block text-sm font-semibold text-gray-800">{item.title}</span>
                <span className="block text-xs text-gray-500">{item.subtitle}</span>
              </div>
            </li>
          ))}
        </ul> :
        <span>No results :(</span>}
    </div>
  );
};

SearchDropdownPanel.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
  opened: PropTypes.bool,
};

export default SearchDropdownPanel;
