import { Switch } from "@/components/ui/switch"
import { useGetMainActivities } from "./requests/useGetMainActivities"
import Loading from "../loading/Loading"

const BuildingDetails = ({ formData, setFormData, setStepDone }) => {

    const details = formData?.details ?? []

    const handleToggle = (id) => (checked) => {
        if (checked) {
            // Add to details array
            setFormData({ ...formData, details: [...details, id] });
            setStepDone(2);
        } else {
            // Remove from details array
            setFormData({ ...formData, details: details.filter(d => d !== id) });
        }
    }
    const { data: mainActivitiesData, isLoading } = useGetMainActivities();

    return (
        <div className="house-type building-details">
            <h2>أخبرنا عن سكنك !.</h2>
            <p>هذه الأنشطة الأساسية تمنح الضيف وضوحًا كاملًا عن السكن.</p>
            {
                isLoading ? <Loading /> :
                    <div className="details-grid">
                        {mainActivitiesData?.map((section) => (
                            <div className="details-card" key={section.id}>
                                <h3>{section.name}</h3>
                                <div className="options-list">
                                    {section.items.map((option) => {
                                        return (
                                            <label className="option-item" key={option.id}>
                                                <span>{option.name}</span>
                                                <div style={{ direction: "ltr" }}>
                                                    <Switch checked={details.includes(option.id)}
                                                        onCheckedChange={handleToggle(option.id)}
                                                        className="data-[state=checked]:bg-[#03a26d] data-[state=unchecked]:bg-[#BFC3C7] ps-[2px]"
                                                    />
                                                </div>
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default BuildingDetails
