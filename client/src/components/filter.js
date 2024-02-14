import './components.css'

function FilterBox(props) {
    return (
        <div className="partFilterBox">
            <label>{props.firstFilterLabel}</label>
            <div className="partType partFilter" onClick={props.onClick} style={{ display: props.firstFilterDisplayCondition }}>
              <h4>{props.currentFilter}</h4>
            </div>
            <div style={{ display: props.isFiltering }}>
              {Object.keys(props.filterMenu).map((filter) => (
                <div className="partType partFilter" onClick={() => props.selectFilter(filter)}>
                  <h4>{props.filterMenu[filter]}</h4>
                </div>
              ))}
            </div>
          </div>
    )
}

export default FilterBox;