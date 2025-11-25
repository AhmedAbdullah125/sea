const FinalDetails = ({ formData, setFormData }) => {
    const data = formData || {};

    const handleChange = (field) => (e) => {
        setFormData({
            ...data,
            [field]: e.target.value,
        });
    };

    const handleCheckbox = (e) => {
        setFormData({
            ...data,
            acceptTerms: e.target.checked,
        });
    };

    return (
        <div className="final-details">
            <h2>نحتاج الى بعض التفاصيل الاخيرة !</h2>
            <p>بيانات بسيطة جداً.</p>

            <div className="final-details-grid">
                <div className="final-form">
                    <div className="form-row">
                        <div className="form-field">
                            <label>
                                الدولة <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل الدولة هنا ..."
                                value={data.country || ""}
                                onChange={handleChange("country")}
                            />
                        </div>
                        <div className="form-field">
                            <label>
                                المدينة <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل المدينة هنا ..."
                                value={data.city || ""}
                                onChange={handleChange("city")}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label>
                                الشارع <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل الشارع هنا ..."
                                value={data.street || ""}
                                onChange={handleChange("street")}
                            />
                        </div>
                        <div className="form-field">
                            <label>
                                الحي <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل الحي هنا ..."
                                value={data.district || ""}
                                onChange={handleChange("district")}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label>
                                رقم الهوية أو الجواز <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل رقم الهوية أو الجواز هنا ..."
                                value={data.idNumber || ""}
                                onChange={handleChange("idNumber")}
                            />
                        </div>
                        <div className="form-field">
                            <label>
                                العمر <span className="required">*</span>
                            </label>
                            <input
                                type="number"
                                min="18"
                                placeholder="أدخل العمر هنا ..."
                                value={data.age || ""}
                                onChange={handleChange("age")}
                            />
                        </div>
                    </div>

                    <label className="terms-row">
                        <input
                            type="checkbox"
                            checked={!!data.acceptTerms}
                            onChange={handleCheckbox}
                        />
                        <span>
                            بالنقر فوق “نشر الآن”، فإنك توافق على{" "}
                            <a href="#terms">الشروط والأحكام وسياسة الخصوصية</a>
                        </span>
                    </label>
                </div>
                <div className="pledge-card">
                    <h3>تعهد المستضيف</h3>
                    <p>
                        أنا، بصفتي المستضيف، أقر وأتعهد بما يلي:
                    </p>
                    <ul>
                        <li>
                            1- أن جميع المعلومات المذكورة عن الوحدة السكنية صحيحة ودقيقة بنسبة لا تقل عن 80%.
                        </li>
                        <li>
                            2- الالتزام بمراعاة راحة الضيف، ومعالجة أي أعطال أو مشاكل طارئة بشكل فوري ودون تأخير.
                        </li>
                        <li>
                            3- المحافظة على نظافة الوحدة وتجهيزها بما يتوافق مع المواصفات المذكورة في المنصة.
                        </li>
                        <li>
                            4- الالتزام باللوائح المحلية والأنظمة المعمول بها في ما يخص تأجير الوحدات السكنية.
                        </li>
                        <li>
                            5- التعامل مع الضيوف بأعلى معايير الاحترام والاحترافية.
                        </li>
                        <li>
                            6- في حال حدث ظرف طارئ يمنع استضافة الضيف، ألتزم بإبلاغ المنصة فوراً وإيجاد حل بديل إن أمكن.
                        </li>
                    </ul>
                    <p className="pledge-sign">
                        بتوقيعي على هذا التعهد أوافق على الشروط أعلاه وأتحمل كامل المسؤولية تجاه الضيوف والمنصة.
                    </p>
                </div>


            </div>
        </div>
    );
};

export default FinalDetails;
