import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css'
import { useEffect } from 'react';

interface Props {
    isHamburguerMenuOptionVisible: boolean;
}

const HamburguerMenu: React.FC<Props> = ({ isHamburguerMenuOptionVisible }) => {

    const [hamburguerMenuOptionVisibility, setHamburguerMenuOptionVisibility] = useState('none');

    function openHamburguerMenuOption() {
        setHamburguerMenuOptionVisibility(hamburguerMenuOptionVisibility === 'block' ? 'none' : 'block');
    }

    useEffect(() => {
        setHamburguerMenuOptionVisibility('none');
    }, [isHamburguerMenuOptionVisible])

    return (
        <div className={globalComponentStyle.hamburguerMenuContainer}>
            <div>
                <div className={globalComponentStyle.hamburguerMenu} onClick={openHamburguerMenuOption}>
                    <div className={globalComponentStyle.dash}></div>
                    <div className={globalComponentStyle.dash}></div>
                    <div className={globalComponentStyle.dash}></div>
                </div>
            </div>
            <div className={globalComponentStyle.hamburguerMenuOptions} style={{ display: hamburguerMenuOptionVisibility }}>
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