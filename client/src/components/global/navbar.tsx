import React from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css';
import NavBarIcon from './navbaricon';
import HamburguerMenu from './hamburguermenu';
import homeIcon from '../../images/home.png';
import buildIcon from '../../images/build.png';
import bookIcon from '../../images/book.png';

interface Props {
    isHamburguerMenuOptionVisible: boolean;
}

const NavBar : React.FC<Props> = ({isHamburguerMenuOptionVisible}) => {
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
                    <NavBarIcon
                        navIcon={buildIcon}
                        navLabel='Montar PC'
                    />
                    <Link to='/list'>
                        <NavBarIcon
                            navIcon={bookIcon}
                            navLabel='Ver peças'
                        />
                    </Link>
                </div>
                <HamburguerMenu isHamburguerMenuOptionVisible={isHamburguerMenuOptionVisible} />
            </div>
        </nav>
    )
}

export default NavBar;