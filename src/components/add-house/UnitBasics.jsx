import { useState, useEffect } from "react";
import unitPlanImg from "../../../public/app/houseImage.png";

const UnitBasics = ({ formData, setFormData, setStepDone }) => {
  const [hoveredKey, setHoveredKey] = useState(null);

  const updateField = (field, delta, min = 0) => {
    setFormData(prev => {
      const current = prev?.[field] ?? 0;
      const next = Math.max(min, current + delta);
      return { ...prev, [field]: next };
    });
  };

  const counters = [
    { key: "guests", label: "عدد الضيوف !" },
    { key: "children", label: "عدد الأطفال !" },
    { key: "bedrooms", label: "غرف النوم !" },
    { key: "beds", label: "عدد الأسرة !" },
    { key: "bathrooms", label: "عدد الحمامات !" },
  ];

  useEffect(() => {
    const hasAnyCounter = counters.some(
      counter => (formData?.[counter.key] ?? 0) > 0
    );

    if (hasAnyCounter) {
      setStepDone(4);
    }
  }, [formData, setStepDone]);

  return (
    <div className="unit-basics">
      <h2>شاركنا الأساسيات حول وحدتك السكنية !</h2>
      <p>الخطوة الأولى لعرض وحدتك باحترافية تامة</p>

      <div className="unit-basics-grid">
        {/* Right: counters */}
        <div className="unit-basics-box">
          <h3>أساسيات وحدتك :</h3>

          {counters.map(item => (
            <div className="unit-basics-row" key={item.key}>
              <span className="unit-basics-label">{item.label}</span>
              <div
                className="unit-basics-counter"
                id={item.key}
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <button
                  type="button"
                  className="counter-btn minus"
                  onClick={() => updateField(item.key, -1)}
                >
                  –
                </button>
                <span className="counter-value">
                  {formData?.[item.key] ?? 0}
                </span>
                <button
                  type="button"
                  className="counter-btn plus"
                  onClick={() => updateField(item.key, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Left: plan image */}
        <div className="unit-basics-plan">
          <img src={unitPlanImg} alt="مخطط الوحدة" />
          <div
            className=
            {`plan-tooltip tooltip-${hoveredKey}`}
          >
            <span>أبرز التفاصيل التي تميزك !</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitBasics;
