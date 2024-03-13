import React, { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css'
import { useDetectClickOutside } from 'react-detect-click-outside';
import hamburguerIcon from '../../images/hamburguer.png'
import BuildMode from './buildmode';

const HamburguerMenu: React.FC = () => {
    const buildDialogRef = useRef<HTMLDialogElement>(null);

    function openBuildPcModal() {
        buildDialogRef.current!.showModal();
    }

    function closeBuildPcModal() {
        buildDialogRef.current!.close();
    }

    const hamburguerMenuDialogRef = useRef<HTMLDialogElement>(null);

    function openMenuModal() {
        hamburguerMenuDialogRef.current!.showModal();
    }

    function closeMenuModal() {
        hamburguerMenuDialogRef.current!.close();
    }

    return (
        <div className={globalComponentStyle.hamburguerMenuContainer}>
            <div>
                <img src={hamburguerIcon} className={globalComponentStyle.hamburguerMenu} onClick = {openMenuModal}>
                </img>
            </div>
            <dialog ref = {hamburguerMenuDialogRef} onClick = {closeMenuModal} className={globalComponentStyle.hamburguerMenuDialog}>
                <div className={globalComponentStyle.hamburguerMenuOptions} >
                <Link to='/'>
                    <div className={globalComponentStyle.hamburguerMenuOption}>
                        <h4>Inicio</h4>
                    </div>
                </Link>
                <div onClick={openBuildPcModal}>
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
            </dialog>
            <BuildMode
            dialogRef={buildDialogRef}
            closeModal={closeBuildPcModal}
            />
        </div>
    )
}

export default HamburguerMenu;