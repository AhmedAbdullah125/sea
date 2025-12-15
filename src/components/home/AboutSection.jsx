import { motion } from "framer-motion"
import aboutimage from "../../../public/app/aboutimage.png"
import poeple1 from "../../../public/app/poeple1.png"
import poeple2 from "../../../public/app/poeple2.png"
import poeple3 from "../../../public/app/poeple3.png"
import users from "../../../public/app/users.svg"
import reels from "../../../public/app/reels.svg"
import part from "../../../public/app/part.svg"
import { Link, useLocation } from "react-router-dom"

const AboutSection = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="about-section py-16 bg-body"
    >
      <div className="container">
        <div className="about-grid">

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="about-content"
          >
            {/* Tag */}
            <div className="about-tag">من نحــــن</div>

            {/* Title */}
            <div className="about-title">
              نبــــــذة عن
              <br />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-blue">الشركــــــة</span>
                <div className="about-profiles">
                  <div className="profile-circle">
                    <img src={poeple1} alt="Profile 1" />
                  </div>
                  <div className="profile-circle">
                    <img src={poeple2} alt="Profile 2" />
                  </div>
                  <div className="profile-circle">
                    <img src={poeple3} alt="Profile 3" />
                  </div>
                  <div className="profile-circle more-circle">
                    <span>+4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Images */}

            {/* Description List */}
            <div className="about-list">
              <div className="about-item">
                <img src={users} alt="" />
                <p>
                  انطلقـت سي عـام 2022 لإعـادة تعريـف تجربـة السفـر بـأسـلوب حديـث وشغـوف.
                </p>
              </div>
              <div className="about-item">
                <img src={reels} alt="" />
                <p>نقدم رحلات متكاملة بتفاصيل مريحة وتجارب تبقى في الذاكرة.</p>
              </div>
              <div className="about-item">
                <img src={part} alt="" />
                <p>لسنا مجرد شركـــة سفــر.. نحن شريـك رحلتك من بدايتها إلى نهايتها.</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="about-contact">
              <Link to={isHomePage ? "/about" : "/packages"} className="about-btn">
                <span>{isHomePage ? "اقــرأ المــزيد" : "إكتشف عروضنــا"}</span>
                <div className="i-cont">
                  <i class="fa-solid fa-arrow-left"></i>
                </div>
              </Link>
              <Link to="mailto:Mirmaz.academy@Contact.com" className="contact-item">
                <span>Mirmaz.academy@Contact.com</span>
                <i className="fa-regular fa-envelope"></i>
              </Link>
              <Link to="tel:+966548876033" className="contact-item">
                <span style={{ direction: "ltr" }}>+964 54 887 6033</span>
                <i className="fa-solid fa-phone"></i>
              </Link>
            </div>
          </motion.div>

          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="about-image"
          >
            <img src={aboutimage} alt="Sea Tourism" />
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}

export default AboutSection
