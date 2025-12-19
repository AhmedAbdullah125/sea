import planningIcon from "../../../public/app/planningIcon.svg"
import ImplementationIcon from "../../../public/app/ImplementationIcon.svg"
import ratingIcon from "../../../public/app/ratingIcon.svg"


const OurWork = () => {
    const workData = [
        {
            id: 'planning',
            icon: planningIcon,
            title: 'التخطيط !',
            description: 'نبدأ بفهم عميق لاحتياجات العميل واهتماماته، لنصمم باقات سياحية مخصصة بدقة واحترافية.',
            className: 'planning'
        },
        {
            id: 'implementation',
            icon: ImplementationIcon,
            title: 'التنفيذ !',
            description: 'نحرص على تقديم تجربة سياحية لا تفوق أعلى معايير الجودة وأريحية من البداية حتى نهاية الجولة.',
            className: 'implementation'
        },
        {
            id: 'rating',
            icon: ratingIcon,
            title: 'التقييــــــم !',
            description: 'نقدم رضاى العمـلاء ونستفيد من ملاحظاتهم لتطوير جودتنا باستمرار، وضمان تجربة لا مثيل لها في كل رحلة.',
            className: 'rating'
        }
    ]

    return (
        <div className="work-section">
            <div className="container">
                <div className="work-header">
                    <h2>منهــــــج العمل لديـــــنا لضمــــــان تجربـــــة سيـــــاحية لا مثـــــيل لهـــــا !</h2>
                    <p>"نصمم رحلاتك بدقة لنقدم لك أفضل تجربة سياحية."</p>
                </div>

                <div className="work-cards">
                    {workData.map((item) => (
                        <div key={item.id} className={`work-card ${item.className}`}>
                            <div className="card-icon">
                                <img src={item.icon} alt={item.title} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OurWork
