import globalComponentStyle from './styles/globalcomponents.module.css'

function CircleButton(props) {
    return (
        <button className={globalComponentStyle.circleButton} onClick={props.onClick}><h1>{props.buttonIcon}</h1></button>
    )
}

export default CircleButton;