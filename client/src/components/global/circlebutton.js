import './styles/globalcomponents.css'

function CircleButton(props) {
    return (
        <button className="circleButton" onClick={props.onClick}><h1>{props.buttonIcon}</h1></button>
    )
}

export default CircleButton;