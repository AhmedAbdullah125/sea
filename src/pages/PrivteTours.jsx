import { useSearchParams } from "react-router-dom";
import FilterGrid from "../components/privite-tour/FilterGrid";
import FilterPanel from "../components/privite-tour/FilterPanel";
import Breadcrumbs from "../components/home/BreadCrumbs";
const PrivteTours = () => {
  // state for search params
  const [searchParams, setSearchParams] = useSearchParams();
  //  filters
  const filters = {
    start: searchParams.get("start") || "",
    end: searchParams.get("end")||"",
    date: searchParams.get("date")||"",
    number: searchParams.get("number")||"",
    lang: searchParams.get("lang")||"",
    country: searchParams.get("country")||"",
    city: searchParams.get("city")||"",
    model: searchParams.get("model")||"",
    type: searchParams.get("type")||"",
  };
  // update filters
  const updateFilters = (values) => {
    const params = new URLSearchParams();
    if (values.start) params.set("start", values.start);
    if (values.end) params.set("end", values.end);
    if (values.date) params.set("date", values.date);
    if (values.number) params.set("number", values.number);
    if (values.lang) params.set("lang", values.lang);
    if (values.country) params.set("country", values.country);
    if (values.city) params.set("city", values.city);
    if (values.model) params.set("model", values.model);
    if (values.type) params.set("type", values.type);
    setSearchParams(params);
  };
  return (
    <main className="container my-16 ">
      {/* breadcrumb */}
      <div className="mb-8">
      <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: "النقل و الجولات", href: "/transport" }, { label: "جولات خـــاصة", href: "/privte-tours" }]} />
      </div>
      <FilterPanel defaultValues={filters} onFilter={updateFilters} />
      <FilterGrid/>
    </main>
  )
}

export default PrivteTours
