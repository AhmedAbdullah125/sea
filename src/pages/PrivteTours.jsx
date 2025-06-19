import { useSearchParams } from "react-router-dom";
import FilterGrid from "../components/privite-tour/FilterGrid";
import FilterPanel from "../components/privite-tour/FilterPanel";
import Breadcrumbs from "../components/home/BreadCrumbs";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { fetchFromApi, } from "../api/utils/fetchData";
import { postToApi, } from "../api/utils/postData";
import { useEffect, useState } from "react";
const PrivteTours = () => {
  // state for search params
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState({});
  const [loading, setLoading] = useState(false);
  //  filters
  const filters = {
    moving_point: searchParams.get("moving_point") || "",
    city: searchParams.get("city")||"",
    date_and_time: searchParams.get("date_and_time")||"",
    number_of_person: searchParams.get("number_of_person")||"",
    country: searchParams.get("country")||"",
    model: searchParams.get("model")||"",
    car_types_id: searchParams.get("car_types_id")||"",
    services: searchParams.get("services")||"",
    airport: searchParams.get("airport")||"",
  };
  // format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // update filters
  const updateFilters = (values) => {
    const params = new URLSearchParams();
    if (values.moving_point) params.set("moving_point", values.moving_point);
    if (values.city) params.set("city", values.city);
    if (values.date_and_time) params.set("date_and_time",formatDate( values.date_and_time));
    if (values.number_of_person) params.set("number_of_person", values.number_of_person);
    if (values.country) params.set("country", values.country);
    if (values.model) params.set("model", values.model);
    if (values.car_types_id) params.set("car_types_id", values.car_types_id);
    if (values.services) params.set("services", values.services);
    if (values.airport) params.set("airport", values.airport);
    setSearchParams(params);
  };

  const fetchTours = async () => {
    setLoading(true);
      const hasFilters = Object.values(filters).some((val) => val);
      const endpoint = hasFilters ? "/transportation-tours-filter" : "/transportation-tours";
    if (!hasFilters) {
      const res = await fetchFromApi(endpoint);
      console.log(res.data);
      
      if(res.status === 200) setTours(res?.data);
      setLoading(false);
    }
    else {
      const res = await postToApi(endpoint, filters);
      if(res.status === 200) setTours(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [searchParams]);

  return (
    <>
    <Header/>
    <main className="container my-16 ">
      {/* breadcrumb */}
      <div className="mb-8">
      <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: "النقل و الجولات", href: "/transport" }, { label: "جولات خـــاصة", href: "/privte-tours" }]} />
      </div>
      <FilterPanel defaultValues={filters} onFilter={updateFilters} />
      <FilterGrid tours={tours} loading={loading} />
      </main>
      <Footer/>
    </>
  )
}

export default PrivteTours
