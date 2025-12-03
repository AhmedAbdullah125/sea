import { useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import HotelsTable from '../components/table/HotelsTable';
import Events from '../components/table/Events';
import BreadCrumb from '../components/global/BreadCrumb';
import Things from '../components/table/Things';
import ActivitiesTable from '../components/table/ActivitiesTable';
import Loading from '../components/loading/Loading';
import FilterPanel from '../components/table/FilterPanel';

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [selectedCity, setSelectedCity] = useState('');
  const [cityName, setCityName] = useState("");
  console.log(selectedCountry, selectedCity);
  console.log(countryName, cityName);


  return (
    <section>
      <Header />
      <BreadCrumb data={[{ title: "الرئيــسية", href: "/" }, { title: "جدول عليـــنا", href: "#" }, { title: "خدمـــاتنا!", href: "#" },]} />
      <FilterPanel setLoading={setLoading}  selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} setCityName={setCityName} setCountryName={setCountryName} />
      {loading ?
        <Loading />
        :
        <>
          <ActivitiesTable selectedCountry={selectedCountry} selectedCity={selectedCity} cityName={cityName} countryName={countryName} description="نقدّم لكم مجموعة مختارة بعناية من الأماكن السياحية التي تستحق الزيارة، وأفضل المطاعم والمقاهي، إضافةً إلى نصائح تساعدكم على خوض تجربة سفر أسهل وأمتع." />
          <Events selectedCountry={selectedCountry} selectedCity={selectedCity} cityName={cityName} countryName={countryName} />
          <HotelsTable selectedCountry={selectedCountry} selectedCity={selectedCity} cityName={cityName} countryName={countryName} description="قدم الموقع قائمة 'توب عشرة' لأفضل الأنشطة والفعاليات السياحية لتسهيل اختيار المسافر لأجمل التجارب في وجهته." />
        </>
      }
      <Things />
      <Footer />
    </section>
  );
};

export default Table;
