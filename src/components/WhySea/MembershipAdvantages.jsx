import magic from "../../../public/app/magic.svg"
import quality from "../../../public/app/quality.svg"
import thumb from "../../../public/app/thumb.svg"
import flash from "../../../public/app/flash.svg"
import visionimage from "../../../public/app/vision.png"

export default function MembershipAdvantages() {
    const advantages = [
        {
            id: 1,
            icon: flash,
            title: 'استقبال وتوديع !',
            description: 'استقبال وتوديع احترافي حسب المستوى.'
        },
        {
            id: 2,
            icon: quality,
            title: 'استرجاع نقدي (Cashback) !',
            description: 'استرجاع نقدي (Cashback) يصل حتى $500.'
        },
        {
            id: 3,
            icon: magic,
            title: 'ترقية !',
            description: 'ترقية الغرف والخدمات للسكن في الفنادق.'
        },
        {
            id: 4,
            icon: thumb,
            title: 'ليلة مجانية !',
            description: 'ليلة مجانية حسب مستوى العضوية.'
        }
    ]

    return (
        <div className="membership-advantages">
            <div className="container">
                <div className="mem-adv-cont">
                    <div className="l-side">
                        <h2>مزايــــــا عضويــــــة <span>+Sea</span> !</h2>
                        <p>تختلف المزايا حسب المستوى العضوية (Sea Elite+ ، Sea Prime ، Sea Explorer) ويشمل:</p>

                        <div className="advantages-grid">
                            {advantages.map((advantage) => (
                                <div key={advantage.id} className="advantage-item">
                                    <div className="icon-wrapper">
                                        <img src={advantage.icon} alt={advantage.title} />
                                    </div>
                                    <div className="text-content">
                                        <h3>{advantage.title}</h3>
                                        <p>{advantage.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="r-side">
                        <div className="img-cont">
                            <img src={visionimage} alt="Sea Tourism" className="vision-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}