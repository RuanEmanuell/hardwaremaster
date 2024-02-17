import React from 'react';
import globalComponentStyle from './styles/globalcomponents.module.css'

interface Props{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    backgroundColor?: string;
    buttonLabel: string;
}

const StandartButton : React.FC<Props> = ({onClick, backgroundColor, buttonLabel}) => {
    return (
        <button className={globalComponentStyle.orangeButton} 
        onClick={onClick} 
        style={{backgroundColor: backgroundColor}}>{buttonLabel}</button>
    )
}

export default StandartButton;