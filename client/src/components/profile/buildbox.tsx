import React, { useEffect, useState } from 'react';
import profileComponentStyle from './styles/profilecomponents.module.css';
import EditIcon from '../../images/edit.png';
import DeleteIcon from '../../images/delete.png';
import Part from '../../utils/part';
import Build from '../../utils/build';
import PartBox from './partbox';

interface Props {
  build: Build;
  index: number;
  parts: Part[];
  onEditBuildClick: (buildId: string) => void;
  onShowDeleteBuildMenuClick: (buildId: string) => void;
}

const BuildBox: React.FC<Props> = ({ build, index, parts, onEditBuildClick, onShowDeleteBuildMenuClick }) => {
  const [buildPrice, setBuildPrice] = useState<string>('0');

  let temporaryBuildPrice : number = 0;

  function calculateBuildPrice(partPrice: string){
    temporaryBuildPrice += parseFloat(partPrice.replace('.', '').replace(',', '.'));
    setBuildPrice(temporaryBuildPrice.toFixed(2));
  }

  return (
    <div className={profileComponentStyle.buildBox}>
      <div className={profileComponentStyle.buildInfoAndButtons}>
        <h2 className={profileComponentStyle.buildLabel}>Build {index + 1}</h2>
        <div className={profileComponentStyle.buildButtons}>
          <div>
            <img src={EditIcon} onClick={() => onEditBuildClick(build._id)}></img>
            <img src={DeleteIcon} onClick={() => onShowDeleteBuildMenuClick(build._id)}></img>
          </div>
        </div>
      </div>
      <PartBox
        userParts={parts}
        build={build}
        calculateBuildPrice = {calculateBuildPrice}
      />
      <h3 className={profileComponentStyle.buildPrice}>Preço total: R$ {buildPrice}</h3>
    </div>
  )
}

export default BuildBox;