import React from 'react';
import homeComponentStyle from './styles/homecomponents.module.css';
import StandartButton from '../global/standartbutton';

interface Props {
    icon: string;
    optionDescription: string;
    buttonLabel: string;
    buttonBackgroundColor: string;
}

const HomeOption : React.FC <Props> = ({icon, optionDescription, buttonLabel, buttonBackgroundColor}) => {
    return (
        <section className={homeComponentStyle.homeOption}>
            <div className={homeComponentStyle.optionIconBox}>
                <img src={icon} className={homeComponentStyle.optionIcon}></img>
            </div>
            <div className={homeComponentStyle.optionDescriptionButtonBox}>
                <h1>{optionDescription}</h1>
                <StandartButton 
                buttonLabel={buttonLabel} 
                backgroundColor={buttonBackgroundColor}/>
            </div>
        </section>
    )
}

export default HomeOption;