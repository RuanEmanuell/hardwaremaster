import React, { useEffect } from 'react';
import profileComponentStyle from './styles/profilecomponents.module.css';
import Part from '../../utils/part';
import Build from '../../utils/build';

interface Props{
    part: Part;
    build: Build;
    calculateBuildPrice: (partPrice: string) => void;
}

const ProfileBuildPart : React.FC<Props> = ({part, calculateBuildPrice, build}) => {
    useEffect(() => {
      calculateBuildPrice(part.price);
    }, [])

    function fixPrice(price: string) {
      return parseFloat(price.replace(',', '.'));
    }
    return (
        <div className={profileComponentStyle.partSpecsBox} key={part.name}>
        <div className={profileComponentStyle.partSpecsImg}>
          <img src={part.imageLink}></img>
        </div>
        <h4>{part.name} 
        {part.type === 'ram' && build.ramQuantity > 1 ? ` (${build.ramQuantity} unidades)` : ''}
        {part.type === 'ssd' && build.ssdQuantity > 1 ? ` (${build.ssdQuantity} unidades)` : ''}</h4>
        <h4>R$ 
        {part.type === 'ram' ? ` ${fixPrice(part.price) * build.ramQuantity}` : 
        part.type === 'ssd' ? ` ${fixPrice(part.price) * build.ssdQuantity}` : 
        `${part.price}`}</h4>
      </div>
    )
}

export default ProfileBuildPart;