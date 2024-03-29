import React from 'react';
import mbComponentStyle from './styles/manualbuildcomponents.module.css';
import Part from '../../utils/part';

interface Props {
  partLabel: string;
  selectedPart: Part;
}

const SaveBuildPart: React.FC<Props> = ({ partLabel, selectedPart }) => {
  return (
    <>
      {!selectedPart ? <></> :
        <div>
          <h2 className={mbComponentStyle.buildPartLabel}>{partLabel}</h2>
          <div className={mbComponentStyle.saveBuildPart}>
            <img src={selectedPart.imageLink}></img>
            <h3>{selectedPart.name} {(selectedPart.type === 'ram' || selectedPart.type === 'ssd') && selectedPart.partQuantity > 1 ? ` (${selectedPart.partQuantity} unidades)` : ''}</h3>
            <h3>R$ {selectedPart.price}</h3>
          </div>
        </div>
      }
    </>
  )
}

export default SaveBuildPart;