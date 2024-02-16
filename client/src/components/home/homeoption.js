import homeComponentStyle from './styles/homecomponents.module.css';
import OrangeButton from '../../components/global/orangebutton';

function HomeOption(props) {
    return (
        <div className={homeComponentStyle.homeOption}>
            <div className={homeComponentStyle.homeOptionImgBox}>
                <img src={props.icon} className={homeComponentStyle.homeOptionImg}></img>
            </div>
            <div className={homeComponentStyle.homeOptionDescriptionBox}>
                <h2 className={homeComponentStyle.homeOptionLabel}>
                    {props.optionDescription}
                </h2>
                <div className={homeComponentStyle.homeOptionButtonBox}>
                    <OrangeButton buttonLabel={props.buttonLabel} />
                </div>

            </div>
        </div>
    )
}

export default HomeOption;