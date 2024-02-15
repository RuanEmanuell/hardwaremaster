import listComponentStyle from './styles/listcomponents.module.css'

function FilterBox(props) {
    return (
        <div className={listComponentStyle.partFilterBox}>
            <label>{props.firstFilterLabel}</label>
            <div className={`${listComponentStyle.partType} ${listComponentStyle.partFilter}`} onClick={props.onClick} style={{ display: props.firstFilterDisplayCondition }}>
              <h4>{props.currentFilter}</h4>
            </div>
            <div style={{ display: props.isFiltering }}>
              {Object.keys(props.filterMenu).map((filter, index) => (
                <div className={`${listComponentStyle.partType} ${listComponentStyle.partFilter}`}
                key = {index}
                onClick={() => props.selectFilter(filter)}>
                  <h4>{props.filterMenu[filter]}</h4>
                </div>
              ))}
            </div>
          </div>
    )
}

export default FilterBox;