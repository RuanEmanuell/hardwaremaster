import { useEffect, useState } from 'react';
import homeStyle from './styles/home.module.css';
import NavBar from '../../components/global/navbar';
import OrangeButton from '../../components/global/orangebutton';
import GpuIcon from '../../images/gpu.png';
import MotherboardIcon from '../../images/motherboard.png';
import BookIcon from '../../images/bookhome.png';

function Home() {
  return (
    <div >
      <NavBar />
      <div className={homeStyle.mainContainer}>
        <main className={homeStyle.homeOptionsGrid}>
          <div className={homeStyle.homeOption}>
            <div className={homeStyle.homeOptionImgBox}>
              <img src={GpuIcon} className={homeStyle.homeOptionImg}></img>
            </div>
            <div className={homeStyle.homeOptionDescriptionBox}>
              <h2 className={homeStyle.homeOptionLabel}>
                Já sabe o que você quer montar? Escolha cada componente e veja quanto a sua futura máquina vai custar!
              </h2>
              <div className={homeStyle.homeOptionButtonBox}>
                <OrangeButton buttonLabel='Montar PC customizado' />
              </div>

            </div>
          </div>
          <div className={homeStyle.homeOption}>
            <div className={homeStyle.homeOptionImgBox}>
              <img src={MotherboardIcon} className={homeStyle.homeOptionImg}></img>
            </div>
            <div className={homeStyle.homeOptionDescriptionBox}>
              <h2 className={homeStyle.homeOptionLabel}>
                Defina seu orçamento e preferências,
                e deixe que o nosso algoritmo decida o
                melhor PC possível para você!
              </h2>
              <div className={homeStyle.homeOptionButtonBox}>
                <OrangeButton buttonLabel='Encontre seu PC ideal' />
              </div>

            </div>
          </div>
          <div className={homeStyle.homeOption}>
            <div className={homeStyle.homeOptionImgBox}>
              <img src={BookIcon} className={homeStyle.homeOptionImg}></img>
            </div>
            <div className={homeStyle.homeOptionDescriptionBox}>
              <h2 className={homeStyle.homeOptionLabel}>
              Tá curioso sobre alguma especificação ou sobre o preço de alguma peça? Veja a nossa base de dados completa.
              </h2>
              <div className={homeStyle.homeOptionButtonBox}>
                <OrangeButton buttonLabel='Ver todas as peças' />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home;
