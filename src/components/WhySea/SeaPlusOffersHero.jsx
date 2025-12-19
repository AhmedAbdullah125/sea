
import aboutimage from "../../../public/app/aboutimage.png"

export default function SeaPlusOffersHero() {

    return (
        <div className="why-hero">
            <div className="container">
                <div className="why-hero-content">
                    <div className="why-header">
                        <div className="r-side">
                            <div className="icon">👋</div>
                            <h2>اهلا وسهــلا بك في ســي</h2>
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
                            <h2>ســــافر أكثر،</h2>
                            <h2>خطط أقــــل.</h2>
                            <div className="users-text-cont">
                                <p>انضم إلينا واستمتع بتخطيط رحلتك وحجزها بسلاسة وأسعار مستقرة.</p>
                            </div>
                            <button className="book-link">احجــــز الآن <i className="fa-solid fa-arrow-left"></i></button>
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

