import { useEffect, useState } from 'react';
import homeStyle from './styles/home.module.css';

function Home() {
  return (
    <div>
      <div className={homeStyle.navBar}>
        <h1 className={homeStyle.navLogo}>HARDWAREMASTER</h1>
      </div>
      <main>
      </main>
    </div>
  )
}

export default Home;
