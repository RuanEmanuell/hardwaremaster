import React from 'react';
import listComponentStyle from './styles/listcomponents.module.css';
import { useDetectClickOutside } from 'react-detect-click-outside';

interface Props {
  firstFilterLabel: string;
  currentFilter: string;
  isFiltering: string;
  filterMenu: { [key: string]: string }; 
  selectFilter: (filter: string) => void;
  onClick?: () => void; 
  firstFilterDisplayCondition?: string; 
  onClickOutside: () => void; 
}

const FilterBox: React.FC<Props> = ({
  firstFilterLabel,
  currentFilter,
  isFiltering,
  filterMenu,
  selectFilter,
  onClick, 
  firstFilterDisplayCondition,
  onClickOutside
}) => {
  const filterRef = useDetectClickOutside({ onTriggered: onClickOutside });
  return (
    <div className={listComponentStyle.partFilterBox} ref = {filterRef}>
      <label >{firstFilterLabel}</label>
      <div
        className={`${listComponentStyle.partType} ${listComponentStyle.partFilter}`}
        onClick={onClick} 
        style={{ display: firstFilterDisplayCondition }}
      >
        <h4>{currentFilter}</h4>
      </div>
      <div style={{ display: isFiltering }}>
        {Object.keys(filterMenu).map((filter, index) => (
          <div
            className={`${listComponentStyle.partType} ${listComponentStyle.partFilter}`}
            key={index}
            onClick={() => selectFilter(filter)}
          >
            <h4>{filterMenu[filter]}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBox;
