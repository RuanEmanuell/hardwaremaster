import React from 'react';
import mbComponentStyle from './styles/manualbuildcomponents.module.css';
import StandartButton from '../global/standartbutton';

interface Props {
  selectedPartPrice: string;
  selectedPartType: string;
  onIncreasePartQuantity: () => void;
  onDecreasePartQuantity: () => void;
  partQuantity: number;
  onChangePartClick: () => void;
}

const PriceAndChangeButton: React.FC<Props> = ({ selectedPartPrice, selectedPartType, onDecreasePartQuantity, onIncreasePartQuantity, partQuantity, onChangePartClick }) => {
  return (
    <div>
      <div className={mbComponentStyle.priceBox}>
        <h3>Preço:</h3>
        <h4>R$ {selectedPartPrice} </h4>
        <div className={mbComponentStyle.addQuantityBox} style = {{display: selectedPartType === 'ram' || selectedPartType === 'ssd' ? 'flex' : 'none'}}>
          <button className={`${mbComponentStyle.addQuantityButton} ${partQuantity == 4 ? mbComponentStyle.disabledQuantityButton : ''}`}
            onClick={onIncreasePartQuantity}>+</button>
          <h4>{partQuantity}</h4>
          <button className={`${mbComponentStyle.addQuantityButton} ${partQuantity == 1 ? mbComponentStyle.disabledQuantityButton : ''}`}
            onClick={onDecreasePartQuantity}>-</button>
        </div>
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