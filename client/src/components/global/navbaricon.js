import globalComponentStyle from './styles/globalcomponents.module.css'

function NavBarIcon(props) {
    return (
        <div className={globalComponentStyle.navOption}>
            <div>
                <img src={props.navIcon} className={globalComponentStyle.navIcon}></img>
                <h3 className={globalComponentStyle.navLabel}>{props.navLabel}</h3>
            </div>
        </div>
    )
}

export default NavBarIcon;