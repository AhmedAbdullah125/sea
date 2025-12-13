import { useGetHousingTypes } from './requests/useGetHousingTypes'
import Loading from '../loading/Loading'
const HouseType = ({ formData, setFormData, setStepDone }) => {

    const { data: housingTypesData, isLoading } = useGetHousingTypes();

    return (
        <div className="house-type">
            <h2>أخبــرنــا عن سكنـــك !.</h2>
            <p>ابدأ بإدخال معلومات أساسية عن نوع سكنك، صورته الخارجية، مع حالته وموقعه.</p>
            {
                isLoading ? <Loading /> :
                    <div className="typs-grid" >
                        {
                            housingTypesData.map((item, index) => (
                                <div className={`typs-item ${formData.type === item.id ? "active-item" : ""}`} key={item.id} onClick={() => {
                                    setFormData({ ...formData, type: item.id })
                                    setStepDone(1)
                                }}>
                                    <div className="arr-cont">
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </div>
                                    <div className="img-cont">
                                        <img src={item.image} alt="flats" />
                                    </div>
                                    <h3>{item.name}</h3>
                                    <span>{item.caption}</span>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default HouseType
