import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { Link, useNavigate } from 'react-router-dom'
import footerLogo from '../../public/app/footerLogo.svg'
import StepsProgress from '../components/add-house/StepsProgress'
import HouseType from '../components/add-house/HouseType'
import BuildingDetails from '../components/add-house/BuildingDetails'
import Address from '../components/add-house/Address'
import { useState } from 'react'
const AddSteps = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({})
    return (
        <section>
            <Header />
            <div className="add-main-cont">
                <div className="container">
                    <div className="add-cont">
                        <div className="navigate">
                            <button className='navigate-btn' onClick={() => navigate(-1)}><i className='fa-solid fa-arrow-right'></i> <span>السابق</span>الخطوة الاولــى</button>
                            <Link to="/"><img src={footerLogo} alt="logo" /></Link>
                        </div>
                        <StepsProgress step={step} />
                        {
                            step === 1 ? (
                                <HouseType formData={formData} setFormData={setFormData} />
                            ) : step === 2 ? (
                                <BuildingDetails formData={formData} setFormData={setFormData} />
                            ) : step === 3 ? (
                                <Address formData={formData} setFormData={setFormData} />
                            ) : null
                        }
                            <div className="steps-footer">
                                <button
                                    className="steps-btn prev-btn"
                                    onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
                                >
                                <i className="fa-solid fa-arrow-right"></i>
                                <span>السابق</span>
                            </button>
                            <p>جميع الحقوق محفوظة لشركة ســـي - SEA</p>
                            <button
                                className="steps-btn next-btn"
                                onClick={() => setStep(step + 1)}
                            >
                                <span>التالي</span>
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default AddSteps
