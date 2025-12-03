import { Switch } from "@/components/ui/switch"

const HouseFeatures = ({ formData, setFormData }) => {
  // shared features list (right text + icon)
  const baseOptions = [
    { key: "wifi", label: "واي فاي", icon: "fa-wifi" },
    { key: "tv", label: "تلفزيون", icon: "fa-tv" },
    { key: "kitchen", label: "مطبخ", icon: "fa-utensils" },
    {
      key: "parking",
      label: "موقف سيارات مدفوع الأجر داخل العقار",
      icon: "fa-car",
    },
    { key: "washer", label: "غسالة", icon: "fa-soap" },
    { key: "spa_wifi", label: "واي فاي", icon: "fa-bath" }, // غيّر الأيقونة لو حابب
  ];

  // 3 columns / cards
  const sections = [
    {
      key: "main",
      title: "أهم المميزات :",
      options: baseOptions,
    },
    {
      key: "more",
      title: "مميزات أكثر :",
      options: baseOptions,
    },
    {
      key: "safety",
      title: "عناصر السلامة :",
      options: baseOptions,
    },
  ];

  const features = formData?.features ?? {};

  const handleToggle = (sectionKey, optionKey) => (checked) => {
    const fieldKey = `${sectionKey}.${optionKey}`;
    setFormData((prev) => ({
      ...prev,
      features: {
        ...(prev?.features || {}),
        [fieldKey]: checked,
      },
    }));
  };

  return (
    <div className="house-type building-details">
      <h2>أخبر الضيوف بالمميزات الموجودة في وحدتك السكنية !</h2>
      <p>ترى، يمكن أن تضيف المزيد لاحقًا.</p>

      <div className="details-grid">
        {sections.map((section) => (
          <div className="details-card" key={section.key}>
            <h3>{section.title}</h3>

            <div className="options-list">
              {section.options.map((option) => {
                const fieldKey = `${section.key}.${option.key}`;
                const checked = Boolean(features[fieldKey]);

                return (
                  <label className="option-item" key={fieldKey}>
                    {/* text + icon on the right (RTL) */}
                    <div className="option-info">
                      <i className={`option-icon fa-solid ${option.icon}`} />
                      <span className="option-label">{option.label}</span>
                    </div>

                    {/* switch on the left (keep LTR for the toggle) */}
                    <div style={{ direction: "ltr" }}>
                      <Switch
                        checked={checked}
                        onCheckedChange={handleToggle(
                          section.key,
                          option.key
                        )}
                        className="data-[state=checked]:bg-[#03a26d] data-[state=unchecked]:bg-[#BFC3C7] ps-[2px]"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseFeatures;
