import magicIcon from "../../../public/app/magic.svg"
import { Link } from "react-router-dom"

export default function Advantages() {
    const advantagesData = [
        {
            id: 1,
            title: 'دفع إلكترونــــي آمن وسهل ..',
            description: '"دفع آمن عبر الإنترنت بخيارات دفع متعددة لراحتك وسهولة الحجز."',
        },
        {
            id: 2,
            title: 'إنشـــاء مجانـــي على منصة الحجــــوزات ..',
            description: '"إنشاء حسابك مجاني، تتيح لك حجز سهولة و سرعة وسهولة دائمة."'
        },
        {
            id: 3,
            title: 'حجـــــــز فوري مع تأكيد مبـــــاشـــر ..',
            description: '"حجز فوري وتأكيد احجزي لضمانك بدء تنفيذ رحلتك."'
        },
        {
            id: 4,
            title: 'شركـــة سيـــــاحية بــــــرخص والتراخيــص في تركيــا والإمــــــارات ..',
            description: '"شركة سيــــاحية مرخصة تضمن لك خدمات احترافية وآمان."'
        },
        {
            id: 5,
            title: 'عروض سيـــــاحية مخصصة لكل احتياجـــــاتك ..',
            description: '"نصمم رحلات تتناسب تماماً مع رغباتك واحتياجاتك الخاصة وميزانيتك."'
        },
        {
            id: 6,
            title: 'عروض سيـــــاحية حصرية لا تجـــــــدها في أي مكان آخر ..',
            description: '"عروض سياحية حصرية توفر لك تجارب فريدة لا مثيل لها."'
        },
        {
            id: 7,
            title: 'توفيــــــــر الوقت والجهد في التخطيط والتنفيـــــــــــذ ..',
            description: '"نتكفل بكل التفاصيل لتوفير الوقت والجهد في التخطيط."'
        },
        {
            id: 8,
            title: 'فريــــق دعم يقدم أفضل المنتجات والتوصيـــــــات ..',
            description: '"فريق محترف يقدم لك أفضل المنتجات والإجابة الأفضل لتحقيق أفضل تجربة."'
        },
        {
            id: 9,
            title: 'مرونـــة عاليـــــة في تخصيص الرحـــــلات حســـب رغبـــــاتك ..',
            description: '"نصمم رحلاتك الخاصة بتناسب تماماً مع رغباتك الشخصية."'
        }
    ]

    return (
        <div className="why-advantages">
            <div className="container">
                <div className="advantages-header">
                    <Link to="/sea-plus-offers" className="about-btn">
                        <span>إكتشف عروضنــا</span>
                        <div className="i-cont">
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>
                    </Link>
                    <h2>مزايــــــا الحجـــز مـــع <span>ســـــــــــــــي</span> !</h2>
                    <p>نقدم لك مزايا فريدة لتجربة سياحية استثنائية ومريحة!</p>
                </div>

                <div className="advantages-grid">
                    {advantagesData.map((advantage) => (
                        <div
                            key={advantage.id}
                            className={`advantage-card`}
                        >
                            <div className="advantage-icon">
                                <img src={magicIcon} alt="magic icon" />
                            </div>
                            <h3>{advantage.title}</h3>
                            <p>{advantage.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}