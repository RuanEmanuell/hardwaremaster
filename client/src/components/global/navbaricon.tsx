import React from 'react';
import globalComponentStyle from './styles/globalcomponents.module.css';

interface Props{
    navIcon: string;
    navLabel: string;
}

const NavBarIcon : React.FC<Props> = ({navIcon, navLabel}) => {
    return (
        <div className={globalComponentStyle.navOption}>
            <div>
                <img src={navIcon} className={globalComponentStyle.navIcon}></img>
                <h3 className={globalComponentStyle.navLabel}>{navLabel}</h3>
            </div>
        </div>
    )
}

export default NavBarIcon;