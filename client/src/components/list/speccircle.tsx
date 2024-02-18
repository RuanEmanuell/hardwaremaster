import React from 'react';
import listComponentStyle from './styles/listcomponents.module.css'

interface Props{
    performanceRating: string;
    performanceLabel: string;
}

const SpecCircle : React.FC<Props> = ({performanceRating, performanceLabel}) => {
    let specCircleColor = 'rgb(0, 182, 0)';

    if (parseInt(performanceRating) <= 30) {
        specCircleColor = 'rgb(230, 0, 0)';
    }else if (parseInt(performanceRating) <= 60) {
        specCircleColor = 'rgb(245, 228, 0)';
    }

    return (
        <div className={listComponentStyle.dualSpecBox}>
            <p>{performanceLabel} </p> <div className={listComponentStyle.specCircle} style={{ 'backgroundColor': specCircleColor }}><p>{performanceRating}</p></div>
        </div>
    )
}

export default SpecCircle;