import React from 'react';
import { Link } from 'react-router-dom';
import homeStyle from './styles/home.module.css';
import NavBar from '../../components/global/navbar';
import HomeOption from '../../components/home/homeoption';
import GpuIcon from '../../images/gpu.png';
import MotherboardIcon from '../../images/motherboard.png';
import BookIcon from '../../images/bookhome.png';

const Home: React.FC = () => {
  return (
    <div >
      <NavBar />
      <div className={homeStyle.homeBody}>
        <div className={homeStyle.mainContainer}>
          <main className={homeStyle.optionsBox}>
          <Link to="/manualbuild/?mode=action&automaticMode=yes">
            <HomeOption
              icon={GpuIcon}
              optionDescription='Já sabe o que você quer montar? Escolha cada componente e veja quanto a sua futura máquina vai custar!'
              buttonLabel='Montar PC customizado'
              buttonBackgroundColor='rgb(0, 102, 255)'
            ></HomeOption>
            </Link>
            <Link to="/manualbuild/?mode=action&automaticMode=yes">
            <HomeOption
              icon={MotherboardIcon}
              optionDescription='Defina seu orçamento e preferências, e deixe que o nosso algoritmo decida o melhor PC possível para você!'
              buttonLabel='Encontre seu pc ideal'
              buttonBackgroundColor='rgb(219, 85, 16)'
            ></HomeOption>
            </Link>
            <Link to="/list">
            <HomeOption
              icon={BookIcon}
              optionDescription='Tá curioso sobre alguma especificação ou sobre o preço de alguma peça? Veja a nossa base de dados completa.'
              buttonLabel='Ver todas as peças'
              buttonBackgroundColor='rgb(0, 194, 43)'
            ></HomeOption>
            </Link>
          </main>
          <footer className={homeStyle.homeFooter}>
            <h2>Criado por Ruan Emanuell</h2></footer>
        </div>
      </div>
    </div>
  )
}

export default Home;
