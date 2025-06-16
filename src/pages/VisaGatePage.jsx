import VisaForm from "../components/visa/VisaForm"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"


const VisaGatePage = () => {
  return (
    <>
      <Header />
    <main className="my-16 container">
      {/* header of section */}
      <div className="  text-center xl:space-y-8 md:space-y-6 space-y-4">
        <h1 className="xl:text-6xl md:text-4xl text-3xl text-main-blue font-bold ">بوابة تأشيـــرة دبي الإلكترونية</h1>
        <p className="text-xs font-semibold">مرحبًا بك في بوابة تأشيرة دبي الإلكترونية، المنصة الرسمية التي تتيح لك تقديم طلب الحصول على تأشيرة دخول إلى إمارة دبي بكل سهولة وسرعة.</p>
      </div>
      {/* grid */}
      <VisaForm />
      </main>
      <Footer />
    </>
  )
}

export default VisaGatePage
