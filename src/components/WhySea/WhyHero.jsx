
import aboutimage from "../../../public/app/aboutimage.png"
import UsersProfiles from "../global/UsersProfiles"
import poeple1 from "../../../public/app/poeple1.png"
import poeple2 from "../../../public/app/poeple2.png"
import poeple3 from "../../../public/app/poeple3.png"

const WhyHero = () => {
    const usersData = [
        { image: poeple1 },
        { image: poeple2 },
        { image: poeple3 },
    ]
    return (
        <div className="why-hero">
            <div className="container">
                <div className="why-hero-content">
                    <div className="why-header">
                        <div className="r-side">
                            <div className="icon">👋</div>
                            <h2>استمتع بأفضل تجربة سياحية مخصصة لرحلتك القادمة!</h2>
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>
                        <div className="l-side">
                            <span className="icon">تــابعنا ! <i className="fa-solid fa-chevron-left"></i></span>
                            <div className="socials">
                                <a href="https://www.instagram.com/seaofficial/" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                {/* tiktok */}
                                <a href="https://www.tiktok.com/@seaofficial" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-tiktok"></i>
                                </a>
                                {/* x */}
                                <a href="https://www.x.com/seaofficial" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-x-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="r-side">
                            <h2>لمــــــاذا</h2>
                            <h2>ســـي / SEA !</h2>
                            <div className="users-text-cont">
                                <UsersProfiles data={usersData} />
                                <p><span>+10</span> خبيرًا جاهزًا لتخطيط رحلتك المثالية فورًا!</p>
                                <div className="rates">
                                    <i className="fa-solid fa-star"></i>
                                    <h3>4.8</h3>
                                    <p>تقييم 4.9 من أكثر من <span>+120</span> تقييمًا</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-image">
                            <img src={aboutimage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyHero
