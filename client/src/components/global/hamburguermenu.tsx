import React, { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css'
import { useDetectClickOutside } from 'react-detect-click-outside';
import hamburguerIcon from '../../images/hamburguer.png'
import BuildMode from './buildmode';

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
    
    const buildDialogRef = useRef<HTMLDialogElement>(null);

    function openBuildPcModal() {
        buildDialogRef.current!.showModal();
    }

    function closeBuildPcModal() {
        buildDialogRef.current!.close();
    }

    function handleBuildPcClick() {
        openBuildPcModal();
    }


    return (
        <div className={globalComponentStyle.hamburguerMenuContainer}>
            <div>
                <img src={hamburguerIcon} className={globalComponentStyle.hamburguerMenu} onClick={showHamburguerMenu}>

                </img>
            </div>
            <div className={globalComponentStyle.hamburguerMenuOptions} style={{ display: hamburguerMenuDisplay }}>
                <Link to='/'>
                    <div className={globalComponentStyle.hamburguerMenuOption}>
                        <h4>Inicio</h4>
                    </div>
                </Link>
                <div onClick={handleBuildPcClick}>
                <div className={globalComponentStyle.hamburguerMenuOption}>
                    <h4>Montar PC</h4>
                </div>
                </div>
                <Link to='/list'>
                    <div className={globalComponentStyle.hamburguerMenuOption}>
                        <h4>Ver peças</h4>
                    </div>
                </Link>
                <Link to='/profile'>
                    <div className={globalComponentStyle.hamburguerMenuOption}>
                        <h4>Meu perfil</h4>
                    </div>
                </Link>
            </div>
            <BuildMode
            dialogRef={buildDialogRef}
            closeModal={closeBuildPcModal}
            />
        </div>
    )
}

export default HamburguerMenu;