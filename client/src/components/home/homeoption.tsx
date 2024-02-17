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
        <div className={homeComponentStyle.homeOption}>
            <div className={homeComponentStyle.homeOptionImgBox}>
                <img src={icon} className={homeComponentStyle.homeOptionImg}></img>
            </div>
            <div className={homeComponentStyle.homeOptionDescriptionBox}>
                <h2 className={homeComponentStyle.homeOptionLabel}>
                    {optionDescription}
                </h2>
                <div className={homeComponentStyle.homeOptionButtonBox}>
                    <StandartButton buttonLabel={buttonLabel} backgroundColor = {buttonBackgroundColor}/>
                </div>

            </div>
        </div>
    )
}

export default HomeOption;