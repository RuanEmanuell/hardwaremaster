import listComponentStyle from './styles/listcomponents.module.css'

function SpecCircle(props) {
    let specCircleColor = 'rgb(0, 182, 0)';

    if (props.performanceRating <= 30) {
        specCircleColor = 'rgb(230, 0, 0)';
    }else if (props.performanceRating <= 60) {
        specCircleColor = 'rgb(245, 228, 0)';
    }

    return (
        <div className={listComponentStyle.dualSpecBox}>
            <p>{props.performanceLabel} </p> <div className={listComponentStyle.specCircle} style={{ 'backgroundColor': specCircleColor }}><p>{props.performanceRating}</p></div>
        </div>
    )
}

export default SpecCircle;