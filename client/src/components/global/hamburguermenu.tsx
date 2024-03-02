import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css'
import { useDetectClickOutside } from 'react-detect-click-outside';
import hamburguerIcon from '../../images/hamburguer.png'

const HamburguerMenu: React.FC = () => {
    const [hamburguerMenuDisplay, setShareMenuDisplay] = useState<string>('none');

    function showHamburguerMenu() {
        setShareMenuDisplay(hamburguerMenuDisplay === 'none' ? 'block' : 'none');
    }

    function closeHamburguerMenuOutside() {
        if (hamburguerMenuDisplay === 'block') {
            showHamburguerMenu();
        }
    }

    const hamburguerMenuRef = useDetectClickOutside({ onTriggered: closeHamburguerMenuOutside });

    return (
        <div className={globalComponentStyle.hamburguerMenuContainer}>
            <div>
                <img src = {hamburguerIcon} className={globalComponentStyle.hamburguerMenu} ref={hamburguerMenuRef} onClick={showHamburguerMenu}>
                    
                </img>
            </div>
            <div className={globalComponentStyle.hamburguerMenuOptions} style={{ display: hamburguerMenuDisplay }}>
                <Link to='/'>
                    <div className={globalComponentStyle.hamburguerMenuOption}>
                        <h4>Inicio</h4>
                    </div>
                </Link>
                <div className={globalComponentStyle.hamburguerMenuOption}>
                    <h4>Montar PC</h4>
                </div>
                <Link to='/list'>
                    <div className={globalComponentStyle.hamburguerMenuOption}>
                        <h4>Ver peças</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default HamburguerMenu;