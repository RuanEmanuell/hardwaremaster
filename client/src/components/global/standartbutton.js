import globalComponentStyle from './styles/globalcomponents.module.css'

function StandartButton(props) {
    return (
        <button className={globalComponentStyle.orangeButton} onClick={props.onClick} style={{backgroundColor: props.backgroundColor}}>{props.buttonLabel}</button>
    )
}

export default StandartButton;