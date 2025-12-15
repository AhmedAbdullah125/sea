import director from "../../../public/app/poeple1.png";

export default function BodyText() {
  return (
    <div className="tiktok-body-text" dir="rtl">
      <div className="tiktok-body-text__wrap">
        <div className="tiktok-body-text__badge">
          <span className="tiktok-body-text__badge-emoji" aria-hidden="true">
            👋
          </span>

          <span className="tiktok-body-text__badge-text">
            استمتع بأفضل تجربة سياحية مخصصة لرحلاتك القادمة!
          </span>

          <span className="tiktok-body-text__badge-icon" aria-hidden="true">
            ←
          </span>
        </div>

        <h1 className="tiktok-body-text__title">
          رحلتك تبدأ من هنا...
          <br />
          إحجز بثقة.
        </h1>

        <p className="tiktok-body-text__desc">
          منصة إلكترونية أونلاين معتمدة للحجوزات الفندقية و الباقات السياحية حول
          العالم
          <br />
          والتواصل المباشر مع العملاء.
        </p>

        <div className="tiktok-body-text__stats">
          <div className="tiktok-body-text__experts">
            <div className="tiktok-body-text__avatars" aria-hidden="true">
              <img
                className="tiktok-body-text__avatar"
                src={director}
                alt=""
              />
              <img
                className="tiktok-body-text__avatar"
                src={director}
                alt=""
              />
              <img
                className="tiktok-body-text__avatar"
                src={director}
                alt=""
              />
              <img
                className="tiktok-body-text__avatar"
                src={director}
                alt=""
              />
            </div>
            <span className="tiktok-body-text__experts-count">+10</span>
            <span className="tiktok-body-text__experts-text">
              خبيراً جاهزاً لتخطيط رحلاتك المثالية فوراً!
            </span>

          </div>

          <div className="tiktok-body-text__divider" aria-hidden="true" />

          <div className="tiktok-body-text__rating">
            <span className="tiktok-body-text__rating-value">4.8</span>
            <span className="tiktok-body-text__rating-star" aria-hidden="true">
              ★
            </span>

            <span className="tiktok-body-text__rating-text">
              تقييم 4.9 من أكثر من{" "}
              <span className="tiktok-body-text__rating-highlight">+120</span>{" "}
              تقييماً
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}