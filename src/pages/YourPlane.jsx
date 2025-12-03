import { useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import BreadCrumb from '../components/global/BreadCrumb';
import Loading from '../components/loading/Loading';
import FilterPanel from '../components/table/FilterPanel';
import Activities from '../components/table/Activities';

const YourPlane = () => {
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
            <BreadCrumb data={[{ title: "الرئيــسية", href: "/" }, { title: "جدول عليـــنا", href: "#" },]} />
            <FilterPanel setLoading={setLoading} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} setCityName={setCityName} setCountryName={setCountryName} />
            {loading ? <Loading /> : <Activities selectedCountry={selectedCountry} selectedCity={selectedCity} cityName={cityName} countryName={countryName} description="نقدّم لكم مجموعة مختارة بعناية من الأماكن السياحية التي تستحق الزيارة، وأفضل المطاعم والمقاهي، إضافةً إلى نصائح تساعدكم على خوض تجربة سفر أسهل وأمتع." />}
            <Footer />
        </section>
    );
};

export default YourPlane;
