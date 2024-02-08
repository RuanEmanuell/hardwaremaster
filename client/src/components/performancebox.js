import './components.css'

function PerformanceBox(props) {
    return (
        <div className="performanceBox">
        <h3>{props.label}</h3>
        <input
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          className="performanceInput"></input>
      </div>
    )
}

export default PerformanceBox;