import React from 'react';
import mbComponentStyle from './styles/manualbuildcomponents.module.css';

interface Props {
    info1: string;
    info2: string;
    info3: string;
}

const PartInfoBox: React.FC<Props> = ({ info1, info2, info3 }) => {
    return (
        <div className={mbComponentStyle.partInfoBox}>
            <p>{info1}</p>
            <p>{info2}</p>
            <p>{info3}</p>
        </div>
    )
}

export default PartInfoBox;