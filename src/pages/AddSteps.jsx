import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { Link, useNavigate } from 'react-router-dom'
import footerLogo from '../../public/app/footerLogo.svg'
import StepsProgress from '../components/add-house/StepsProgress'
import HouseType from '../components/add-house/HouseType'
import BuildingDetails from '../components/add-house/BuildingDetails'
import Address from '../components/add-house/Address'
import UnitBasics from '../components/add-house/UnitBasics'
import { useEffect, useState } from 'react'
import HouseFeatures from '../components/add-house/HouseFeatures'
import UnitImages from '../components/add-house/UnitImages'
import FinalDetails from '../components/add-house/FinalDetails'
import PublishDetails from '../components/add-house/PublishDetails'
import { firstStepStore } from '../components/add-house/requests/firstStepStore'
import { secondStepStore } from '../components/add-house/requests/secondStepStore'
import Loading from '../components/loading/Loading'
import { thirdStepStore } from '../components/add-house/requests/thirdStepStore'
import { toast } from 'sonner'

const AddSteps = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [stepDone, setStepDone] = useState(0);
  const [loading, setLoading] = useState(false)
  const MAX_STEP = 8;
  console.log(formData);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error('يجب تسجيل الدخول أولاً');
    }
  }, []);
  // Function to get step title based on step number
  const getStepTitle = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 3) {
      return "الخطوة الاولــى";
    } else if (stepNumber >= 4 && stepNumber <= 6) {
      return "الخطوة الثانية";
    } else if (stepNumber >= 7 && stepNumber <= 8) {
      return "الخطوة الثالثة";
    }
    return "الخطوة الاولــى";
  };

  const handleNext = () => {
    if (stepDone == 3) {
      firstStepStore(formData, setLoading, setStep, step);
    }
    else if (stepDone == 6) {
      secondStepStore(formData, setLoading, setStep, step);
    }
    else if (step < MAX_STEP) {
      setStep(step + 1);
    } else {

      thirdStepStore(formData, setLoading, setStep, step, setShowSuccess);
    }
  };
  console.log(stepDone);
  return (
    <section>
      <Header />
      <div className="add-main-cont">
        <div className="container">
          {
            loading ? <Loading />
              :
              <div className="add-cont">
                <div className="navigate">
                  <button className='navigate-btn' onClick={() => navigate(-1)}>
                    {step > 1 && (
                      <>
                        <i className='fa-solid fa-arrow-right'></i>
                        <span>السابق</span>
                      </>
                    )}
                    {getStepTitle(step)}
                  </button>
                  <Link to="/"><img src={footerLogo} alt="logo" /></Link>
                </div>

                <StepsProgress step={step} />

                {step === 1 ? (
                  <HouseType formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : step === 2 ? (
                  <BuildingDetails formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : step === 3 ? (
                  <Address formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : step === 4 ? (
                  <UnitBasics formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : step === 5 ? (
                  <HouseFeatures formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : step === 6 ? (
                  <UnitImages formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : step === 7 ? (
                  <PublishDetails formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : step === 8 ? (
                  <FinalDetails formData={formData} setFormData={setFormData} setStepDone={setStepDone} />
                ) : null}

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
                    disabled={stepDone < step}
                    className={`steps-btn next-btn ${stepDone < step ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleNext}
                  >
                    <span>{step === MAX_STEP ? "نشــر الاعــلان " : "التالي"}</span>
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                </div>
              </div>
          }
        </div>
      </div>

      {/* البوب-أب */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-logo">
              <img src={footerLogo} alt="SEA logo" />
            </div>
            <h2>تهانينا، تم إضافة وحدتك بنجاح !</h2>
            <p>
              خلال أقل من 24 ساعة ستكون وحدتك متاحة على منصتنا
              ليستطيع الضيوف مشاهدتها.
            </p>
            <button
              className="success-main-btn"
              onClick={() => navigate('/')}
            >
              الانتقال للرئيسية
            </button>
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
};

export default AddSteps;
