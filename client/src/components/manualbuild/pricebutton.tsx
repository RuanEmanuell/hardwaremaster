import React, { useEffect } from 'react';
import mbComponentStyle from './styles/manualbuildcomponents.module.css';
import StandartButton from '../global/standartbutton';

interface Part {
  type: string;
  name: string;
  brand: string;
  price: string;
  imageLink: string;
  cpuCores?: string;
  cpuThreads?: string;
  cpuFrequency?: string;
  cpuSocket?: string;
  cpuRamType?: string;
  gpuCores?: string,
  gpuMemory?: string,
  gpuMemoryType?: string,
  gpuRecommendedPower?: string;
  moboChipset?: string,
  moboSocketCompatibility?: string,
  moboRamCompatibility?: string,
  moboSlots?: string,
  ramFrequency?: string,
  ramCapacity?: string,
  ramType?: string,
  powerWatts?: string,
  powerEfficiency?: string,
  powerModular?: string,
  ssdCapacity?: string,
  ssdType?: string,
  ssdSpeed?: string,
  caseForm?: string,
  caseFanSupport?: string,
  caseWcSupport?: string,
  partQuantity: number
}


interface Props {
  selectedPart: Part;
  selectedMobo?: Part;
  onIncreasePartQuantity: () => void;
  onDecreasePartQuantity: () => void;
  onChangePartClick: () => void;
}

const PriceAndChangeButton: React.FC<Props> = ({ selectedPart, selectedMobo, onDecreasePartQuantity, onIncreasePartQuantity, onChangePartClick }) => {
  function defineMaxQuantity() {
    let maxQuantity: number = 4;
    if (selectedPart['type'] === 'ram') {
      if (selectedMobo && selectedMobo['moboSlots']) {
        maxQuantity = parseInt(selectedMobo['moboSlots']);
      }
    }
    return maxQuantity;
  }

  useEffect(()=>{
    defineMaxQuantity();
  },[selectedMobo]);

  return (
    <div>
      <div className={mbComponentStyle.priceBox}>
        <h3>Preço:</h3>
        <h4>R$ {selectedPart['price']} </h4>
        <div className={mbComponentStyle.addQuantityBox} style={{ display: selectedPart['type'] === 'ram' || selectedPart['type'] === 'ssd' ? 'flex' : 'none' }}>
          <button className={`${mbComponentStyle.addQuantityButton} ${selectedPart['partQuantity'] >= defineMaxQuantity() ? mbComponentStyle.disabledQuantityButton : ''}`}
            onClick={onIncreasePartQuantity}>+</button>
          <h4>{selectedPart['partQuantity']}</h4>
          <button className={`${mbComponentStyle.addQuantityButton} ${selectedPart['partQuantity'] == 1 ? mbComponentStyle.disabledQuantityButton : ''}`}
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