import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
const PlanComments = ({ data }) => {

    const formatter = new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    const firstRow = data.reviews.slice( 0, data.reviews.length / 2)
    const secondRow = data.reviews.slice(data.reviews.length / 2)
    const ReviewCard = ({
        item,

    }) => {
        return (
            <div className="comment" key={item.id}>
                <div className="comment-head">
                    {/* first letter of the name */}
                    <span className='first-letter'>{item?.user.name?.slice(0, 1)}</span>
                    <span>{item.user.name}</span>

                </div>
                <p className="comment-body">{item.comment}</p>
                <div className="dets">
                    <span className='date'>{formatter.format(new Date(item.created_at))}</span>
                    <span className='rating'> {item.rating}/5 <i className="fa-solid fa-star"></i>   </span>
                </div>

            </div>
        )
    }

    return (
        <section className="package-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h6 className="package-head">التقييمات !</h6>
                    <h3 className="package-title">التقييمات !</h3>
                    <p className="package-text">ماذا يقول ضيوفنا عناا ...</p>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative flex w-full flex-col items-center justify-center overflow-hidden ">
                
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.id} item={review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.id} item={review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </motion.div>
        </section>

    )
}

export default PlanComments
