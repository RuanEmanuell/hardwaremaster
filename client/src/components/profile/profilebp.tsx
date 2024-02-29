import React, { useEffect } from 'react';
import profileComponentStyle from './styles/profilecomponents.module.css';
import Part from '../../utils/part';

interface Props{
    part: Part;
    calculateBuildPrice: (partPrice: string) => void;
}

const ProfileBuildPart : React.FC<Props> = ({part, calculateBuildPrice}) => {
    useEffect(() => {
      calculateBuildPrice(part.price);
    }, [])
    return (
        <div className={profileComponentStyle.partSpecsBox} key={part.name}>
        <div className={profileComponentStyle.partSpecsImg}>
          <img src={part.imageLink}></img>
        </div>
        <h4>{part.name}</h4>
        <h4>R$ {part.price}</h4>
      </div>
    )
}

export default ProfileBuildPart;