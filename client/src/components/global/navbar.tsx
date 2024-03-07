import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css';
import NavBarIcon from './navbaricon';
import HamburguerMenu from './hamburguermenu';
import homeIcon from '../../images/home.png';
import buildIcon from '../../images/build.png';
import bookIcon from '../../images/book.png';
import profileIcon from '../../images/profile.png';
import StandartButton from './standartbutton';
import BuildMode from './buildmode';

const NavBar: React.FC = () => {
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
        <nav className={globalComponentStyle.navBarContainer}>
            <div className={globalComponentStyle.navBar}>
                <div className={globalComponentStyle.navLogo}>
                    <h1>HardwareMaster</h1>
                </div>
                <div className={globalComponentStyle.navOptions}>
                    <Link to='/'>
                        <NavBarIcon
                            navIcon={homeIcon}
                            navLabel='Inicio'
                        />
                    </Link>
                    <div onClick={handleBuildPcClick}>
                        <NavBarIcon
                            navIcon={buildIcon}
                            navLabel='Montar PC'
                        />
                    </div>
                    <Link to='/list'>
                        <NavBarIcon
                            navIcon={bookIcon}
                            navLabel='Ver peças'
                        />
                    </Link>
                    <Link to='/profile'>
                        <NavBarIcon
                            navIcon={profileIcon}
                            navLabel='Meu perfil'
                        />
                    </Link>
                </div>
                <HamburguerMenu />
            </div>
            <BuildMode
            dialogRef={buildDialogRef}
            closeModal={closeBuildPcModal}
            />
        </nav>
    )
}

export default NavBar;