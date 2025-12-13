import { Switch } from "@/components/ui/switch"
import { useGetMainFeatures } from "./requests/useGetMainFeatures";
import Loading from "../loading/Loading";

const HouseFeatures = ({ formData, setFormData, setStepDone }) => {
  const { data: featuresData, isLoading } = useGetMainFeatures();
  const features = formData?.features ?? [];
  const handleToggle = (featureId) => (checked) => {
    setFormData((prev) => {
      const currentFeatures = prev?.features ?? [];
      if (checked) {
        // Add ID to array if not already present
        if (!currentFeatures.includes(featureId)) {
          return {
            ...prev,
            features: [...currentFeatures, featureId],
          };
        }
      } else {
        // Remove ID from array
        return {
          ...prev,
          features: currentFeatures.filter(id => id !== featureId),
        };
      }
      return prev;
    });
    if (features.length > 0) {
      setStepDone(5);
    }
  };

  return (
    <div className="house-type building-details">
      <h2>أخبر الضيوف بالمميزات الموجودة في وحدتك السكنية !</h2>
      <p>ترى، يمكن أن تضيف المزيد لاحقًا.</p>

      {
        isLoading ? <Loading /> :
          <div className="details-grid">
            {featuresData?.map((section) => (
              <div className="details-card" key={section.id}>
                <h3>{section.name}</h3>

                <div className="options-list">
                  {section.items.map((option) => {
                    const checked = features.includes(option.id);

                    return (
                      <label className="option-item" key={option.id}>
                        {/* text + icon on the right (RTL) */}
                        <div className="option-info">
                          <img src={option.image} alt="" className="w-7 h-7" />
                          <span className="option-label">{option.name}</span>
                        </div>

                        {/* switch on the left (keep LTR for the toggle) */}
                        <div style={{ direction: "ltr" }}>
                          <Switch
                            checked={checked}
                            onCheckedChange={handleToggle(option.id)}
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
      }
    </div>
  );
};

export default HouseFeatures;
