import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/hotels/FilterPanel';
import HotelsGrid from '../components/hotels/HotelsGrid';
import HotelHeader from '../components/hotel/HotelHeader';
const Hotel = () => {
    // state for search params
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = {
        start: searchParams.get("start") || "",
        end: searchParams.get("end") || "",
        date: searchParams.get("date") || "",
        number: searchParams.get("number") || "",
        lang: searchParams.get("lang") || "",
        country: searchParams.get("country") || "",
        city: searchParams.get("city") || "",
        model: searchParams.get("model") || "",
        type: searchParams.get("type") || "",
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
        <section>
            <Header />
            {/* Start Page Content */}
            <div className="container">
                <HotelHeader    />
            </div>

            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Hotel
