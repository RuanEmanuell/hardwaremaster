import React from 'react';
import globalComponentStyle from './styles/globalcomponents.module.css'

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    buttonIcon: string;
}

const CircleButton: React.FC<Props> = ({ onClick, buttonIcon }) => {
    return (
        <button className={globalComponentStyle.circleButton} onClick={onClick}>
            <h1>{buttonIcon}</h1>
        </button>
    );
};

export default CircleButton;
