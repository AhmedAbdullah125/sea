import { useState } from "react";

const PublishDetails = ({ formData, setFormData }) => {
    const data = formData || {};
    const desc = data.highlight || "";

    const handleChange = (field) => (e) => {
        setFormData({
            ...data,
            [field]: e.target.value,
        });
    };

    const handleContactType = (type) => {
        setFormData({
            ...data,
            contactType: type, // "whatsapp" | "sea" | "ai"
        });
    };

    const handleDescription = (e) => {
        const value = e.target.value.slice(0, 500);
        setFormData({
            ...data,
            highlight: value,
        });
    };

    const descriptionLength = desc?.length || 0;

    return (
        <div className="publish-step">
            <h2>الخطوة الاخيرة لاكتمال النشر !</h2>
            <p>يمكنك استعمال الذكاء الاصطناعي Ai.</p>

            {/* أعلى الصفحة: نوع التواصل + العنوان */}



            {/* باقي المحتوى: الأسعار + الوصف */}
            <div className="publish-main">
                {/* الوصف */}
                <div className="highlight-area">
                    <label>
                        العنوان <span className="required">*</span>
                    </label>
                    <div className="publish-top">
                        <div className="publish-title-field">

                            <input
                                type="text"
                                placeholder="أدخل العنوان هنا ..."
                                value={data.title || ""}
                                onChange={handleChange("title")}
                            />
                        </div>
                        <div className="contact-types">
                            <button
                                type="button"
                                className={
                                    "contact-tab right gradient " +
                                    (data.contactType === "ai" ? "active" : "")
                                }
                                onClick={() => handleContactType("ai")}
                            >
                                <i className="fa-solid fa-wand-magic-sparkles" />
                                <span>إستخدم Ai</span>
                            </button>
                        </div>


                    </div>
                    <label>
                        وش المميز في وحدتك او سكنك <span className="required">*</span>
                    </label>
                    <p className="highlight-help">
                        أخبرنا ما الذي يميز سكنك عن غيره ..
                    </p>
                    <div className="highlight-box">
                        <textarea
                            placeholder="اكتب هنا ..."
                            value={desc}
                            onChange={handleDescription}
                        />
                        <div className="highlight-counter">
                            {descriptionLength} / 500
                        </div>
                    </div>
                </div>

                {/* الأسعار */}
                <div className="pricing-area">
                    <div className="publish-top">
                        <div className="contact-types">
                            <span className="contact-label">نوع الحجز *</span>
                            <div className="contact-tabs">
                                <button
                                    type="button"
                                    className={
                                        "contact-tab left " +
                                        (data.contactType === "whatsapp" ? "active" : "")
                                    }
                                    onClick={() => handleContactType("whatsapp")}
                                >
                                    <i className="fa-brands fa-whatsapp" />
                                    <span>التواصل عبر الواتساب</span>
                                </button>

                                <button
                                    type="button"
                                    className={
                                        "contact-tab middle " +
                                        (data.contactType === "sea" ? "active primary" : "primary")
                                    }
                                    onClick={() => handleContactType("sea")}
                                >
                                    <span>التواصل من خلال سي - sea</span>
                                    <i className="fa-solid fa-arrow-left-long" />
                                </button>


                            </div>
                        </div>


                    </div>
                    <div className="pricing-header-cont">
                        <div className="pricing-header">
                            <h3>
                                حدد سعرا أساسيا خلال ايام, الاسبوع, الشهر
                                <span className="required"> *</span>
                            </h3>
                            <p>
                                ملاحظة: السعر الذي سيدفعه الضيف قبل الضرائب؛ مثلاً 2,375 ر.س
                            </p>
                        </div>

                        <div className="pricing-row">
                            <div className="pricing-field">
                                <label>
                                    السعر لليلة <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="مثال : من 500 ريال حتى 600 ريال"
                                    value={data.priceNight || ""}
                                    onChange={handleChange("priceNight")}
                                />
                            </div>

                            <div className="pricing-field">
                                <label>
                                    السعر للأسبوع <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="مثال : من 1000 ريال حتى 2000 ريال"
                                    value={data.priceWeek || ""}
                                    onChange={handleChange("priceWeek")}
                                />
                            </div>

                            <div className="pricing-field">
                                <label>
                                    السعر للشهر <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="مثال : من 5000 ريال حتى 6000 ريال"
                                    value={data.priceMonth || ""}
                                    onChange={handleChange("priceMonth")}
                                />
                            </div>
                        </div>

                        <button type="button" className="ai-pricing-btn">
                            <i className="fa-solid fa-wand-magic-sparkles" />
                            <span>إستخدم عرض المساكن المشابهة عبر Ai</span>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default PublishDetails;
