import { useState } from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css'
import { useEffect } from 'react';

function HamburguerMenu(props) {

    const [isHamburguerMenuOptionVisible, setHamburguerMenuOptionVisible] = useState('none');

    function openHamburguerMenuOption() {
        setHamburguerMenuOptionVisible(isHamburguerMenuOptionVisible === 'block' ? 'none' : 'block');
    }

    useEffect(() => {
        if (props.isHamburguerMenuOptionVisible === false) {
            setHamburguerMenuOptionVisible('none');
        }
    })

    return (
        <div className={globalComponentStyle.hamburguerMenuContainer}>
            <div>
                <div className={globalComponentStyle.hamburguerMenu} onClick={openHamburguerMenuOption}>
                    <div className={globalComponentStyle.dash}></div>
                    <div className={globalComponentStyle.dash}></div>
                    <div className={globalComponentStyle.dash}></div>
                </div>
            </div>
            <div className={globalComponentStyle.hamburguerMenuOptions} style={{ display: isHamburguerMenuOptionVisible }}>
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