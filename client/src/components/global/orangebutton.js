import globalComponentStyle from './styles/globalcomponents.module.css'

function OrangeButton(props) {
    return (
        <button className={globalComponentStyle.orangeButton} onClick={props.onClick}>{props.buttonLabel}</button>
    )
}

export default OrangeButton;