import './components.css'

function SpecCircle(props) {
    let specCircleColor = 'rgb(0, 182, 0)';

    if (props.performanceRating <= 60) {
        specCircleColor = 'rgb(245, 228, 0)';
    } else if (props.performanceRating <= 25) {
        specCircleColor = 'rgb(196, 7, 0)';
    }

    return (
        <div className="dualSpecBox">
            <p>{props.performanceLabel} </p> <div className="specCircle" style={{ 'backgroundColor': specCircleColor }}>{props.performanceRating}</div>
        </div>
    )
}

export default SpecCircle;