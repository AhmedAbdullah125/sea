import { Switch } from "@/components/ui/switch"

const BuildingDetails = ({ formData, setFormData }) => {
    const sections = [
        {
            title: "البيئة والمبنى :",
            options: [
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !"
            ]
        },
        {
            title: "الواجهة والبيئة المحيطة :",
            options: [
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !"
            ]
        },
        {
            title: "الأمان والخدمات المشتركة :",
            options: [
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !",
                "هـل الوحـــدة داخل المجــمع !"
            ]
        }
    ]

    const details = formData?.details ?? {}

    const handleToggle = (sectionIndex, optionIndex) => (checked) => {
        const key = `section${sectionIndex}_option${optionIndex}`
        setFormData({...formData, details: {...details, [key]: checked}})
    }

    return (
        <div className="house-type building-details">
            <h2>أخبرنا عن سكنك !.</h2>
            <p>هذه الأنشطة الأساسية تمنح الضيف وضوحًا كاملًا عن السكن.</p>
            <div className="details-grid">
                {sections.map((section, sectionIndex) => (
                    <div className="details-card" key={section.title}>
                        <h3>{section.title}</h3>
                        <div className="options-list">
                            {section.options.map((option, optionIndex) => {
                                const key = `section${sectionIndex}_option${optionIndex}`
                                return (
                                    <label className="option-item" key={key}>
                                        <span>{option}</span>
                                        <div style={{direction:"ltr"}}>
                                            <Switch
                                                checked={Boolean(details[key])}
                                                onCheckedChange={handleToggle(sectionIndex, optionIndex)}
                                                className="data-[state=checked]:bg-[#03a26d] data-[state=unchecked]:bg-[#BFC3C7]"
                                            />
                                        </div>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BuildingDetails
