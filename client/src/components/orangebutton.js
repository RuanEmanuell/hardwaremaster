import './components.css'

function OrangeButton(props) {
    return (
        <button className="orangeButton" onClick = {props.onClick}>{props.buttonLabel}</button>
    )
}

export default OrangeButton;