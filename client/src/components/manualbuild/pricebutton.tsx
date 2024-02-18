import React from 'react';
import mbComponentStyle from './styles/manualbuildcomponents.module.css';
import StandartButton from '../global/standartbutton';

interface Props {
  selectedPartPrice: string;
  onChangePartClick: () => void;
}

const PriceAndChangeButton: React.FC<Props> = ({ selectedPartPrice, onChangePartClick }) => {
  return (
    <div>
      <div className={mbComponentStyle.priceBox}>
        <h3>Preço:</h3>
        <p>R$ {selectedPartPrice} </p>
      </div>
      <div className={mbComponentStyle.buttonBox}>
        <StandartButton
          buttonLabel='Trocar peça'
          onClick={onChangePartClick}
        />
      </div>
    </div>
  )
}

export default PriceAndChangeButton;