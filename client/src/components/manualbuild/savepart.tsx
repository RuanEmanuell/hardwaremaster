import React from 'react';
import mbComponentStyle from './styles/manualbuildcomponents.module.css';

interface Part {
  name: string;
  brand: string;
  price: string;
  imageLink: string;
}

interface Props {
  partLabel: string;
  selectedPart: Part;
}

const SaveBuildPart: React.FC<Props> = ({ partLabel, selectedPart }) => {
  return (
    <div>
      <h2 className={mbComponentStyle.buildPartLabel}>{partLabel}</h2>
      <div className={mbComponentStyle.saveBuildPart}>
        <img src={selectedPart?.imageLink}></img>
        <h3>{selectedPart?.name}</h3>
        <h3>R$ {selectedPart?.price}</h3>
      </div>
    </div>
  )
}

export default SaveBuildPart;