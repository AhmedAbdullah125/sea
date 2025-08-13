import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

import payImg1 from '../../assets/pay-img/01.svg'
import payImg2 from '../../assets/pay-img/02.svg'
import payImg3 from '../../assets/pay-img/03.svg'
import payImg4 from '../../assets/pay-img/04.svg'
import payImg5 from '../../assets/pay-img/05.svg'
import { LazyLoadImage } from "react-lazy-load-image-component";
const PlanMarq = ({ data, settings }) => {
    console.log(data);
    const reviews = [
        { img: payImg1, }, { img: payImg2, }, { img: payImg3, }, { img: payImg4, }, { img: payImg5, },
    ];
    const ReviewCard = ({ img,}) => {
        return (
            <div className="pay-item">
                <LazyLoadImage src={img} alt="pay-img" />
            </div>
        );
    };
    return (
        <section className="package-section">
            <div className="container">
                <h6 className="package-head">الدفع !.</h6>
                <h3 className="package-title">نوفـــر لك أفضــل وســـائل الدفع</h3>
                <p className="package-text">نسهل عليك لتستمتع في رحلتك !</p>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden ">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {data.paymentMethodImages.map((review) => (
                        <div className="pay-item min-w-48">
                        <LazyLoadImage src={review.image} alt="pay-img" className="min-w-20 max-h-full" />
                    </div>
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
        </section>

    )
}

export default PlanMarq
