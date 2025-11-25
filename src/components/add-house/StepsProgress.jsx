
const StepsProgress = ({ step }) => {
    return (
        <div className="steps_progress">
            <div className="step">
                <h5>الخطـوة الاولــى</h5>
                <div className={`line-inder ${step >= 1 ? 'active-line' : ''}`}></div>
            </div>
            <div className="step">
                <h5>الخطـوة الثانية</h5>
                <div className={`line-inder ${step >= 4 ? 'active-line' : ''}`}></div>
            </div>
            <div className="step">
                <h5>الخطـوة الثالثة</h5>
                <div className={`line-inder ${step >= 7 ? 'active-line' : ''}`}></div>
            </div>
        </div>
    )
}

export default StepsProgress
