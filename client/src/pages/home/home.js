import { useEffect, useState } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import homeStyle from './styles/home.module.css';
import homeIcon from '../../images/home.png';
import buildIcon from '../../images/build.png';
import bookIcon from '../../images/book.png';

function Home() {
  return (
    <nav>
      <div className={homeStyle.navBar}>
        <div className={homeStyle.navLogo}>
          <h1>HardwareMaster</h1>
        </div>
        <div className={homeStyle.navOptions}>
          <div className={homeStyle.navOption}>
            <Link to ='/'>
              <div>
                <img src={homeIcon} className={homeStyle.navIcon}></img>
                <h3 className={homeStyle.navLabel}>Início</h3>
              </div>
            </Link>
          </div>
          <div className={homeStyle.navOption}>
            <div>
              <img src={buildIcon} className={homeStyle.navIcon}></img>
              <h3 className={homeStyle.navLabel}>Montar PC</h3>
            </div>
          </div>
          <div className={homeStyle.navOption}>
            <div>
              <img src={bookIcon} className={homeStyle.navIcon}></img>
              <h3 className={homeStyle.navLabel}>Ver peças</h3>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
      <main>
      </main>
    </nav>
  )
}

export default Home;
