
import { motion } from 'framer-motion'
import part from '../../../public/app/part.svg'
import nums from '../../../public/app/nums.png'


const Numbers = () => {

  const stats = [
    {
      number: "96%",
      text: "نسبة العملاء الذين قيموا تجربتهم بأنها ممتازة"
    },
    {
      number: "24/7",
      text: "مرافقة مستمرة قبل وأثناء وبعد الرحلة"
    },
    {
      number: "+450",
      text: "فندق بتواصل مباشر لثقة وخدمة أفضل"
    },
    {
      number: "+1250",
      text: "مسافر وثق بنا خلال العام"
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='my-16 container'>
      <div className="new-heads">
        <div className="section-new-title">ارقــامنا</div>
        <h2 className="section-new-title2">نفتخـــر بأرقامنـــا، ونعتـــز بخدمتكم. !</h2>
        <p><img src={part} alt="App Image" loading='lazy' /><span>لسنـــا مجـرد شركــة سفـر… نحن شــريك رحلتك مـن بدايتــها إلى نهايتــها.</span> </p>
      </div>
      <div className="appimage-cont">
        <img src={nums} alt="App Image" loading='lazy' className='w-full h-full object-contain' />
        <div className="overlay">
          <div className="why-header">
            {/* Socials on the left for RTL design as seen in image */}

            <div className="pill-side">
              <div className="pill">
                <div className="icon">👋</div>
                <p>Sea – حيث تتحوّل الرحلة إلى تجربة أروع.</p>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>
            <div className="socials-side">
              <span className="follow-btn">  تــابعنا ! <i className="fa-solid fa-chevron-left"></i></span>
              <div className="socials">
                <a href="https://www.x.com/seaofficial" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="https://www.tiktok.com/@seaofficial" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
                <a href="https://www.instagram.com/seaofficial/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="main-content">
            <h1 className="main-text">
              <span className="brand-text">ســــــــــــــــــــــــــــــــــــــــــــي…</span>
              <br />
              نرافقك من أول فكرة <br /> حتى لحظة العودة !.
            </h1>
          </div>

          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-content">
                  <h3>{stat.number}</h3>
                  <p>{stat.text}</p>
                </div>
                {index < stats.length - 1 && <div className="divider"></div>}
              </div>
            ))}
          </div>

        </div>
      </div>

    </motion.section>
  )
}

export default Numbers
