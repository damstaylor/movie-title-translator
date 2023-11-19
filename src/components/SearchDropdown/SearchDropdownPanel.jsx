import PropTypes from 'prop-types';

const SearchDropdownPanel = ({items = [], onClick}) => {
  return (
    <div className="SearchDropdownPanel">
    {items.length > 0 ?
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => onClick(item)}>
            <img src={item.img} alt={item.title}/>
            <div>
              <span>{item.title}</span>
              <span>{item.subtitle}</span>
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
