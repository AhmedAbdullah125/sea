import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/hotels/FilterPanel';
import HotelsGrid from '../components/hotels/HotelsGrid';
import Loading from '../components/loading/Loading';
import { ChevronDown } from "lucide-react"
import HotelsPagination from '../components/hotels/HotelsPagination';

const Hotels = () => {
    // state for search params

    const [searchParams, setSearchParams] = useSearchParams();
    const [mainData, setMainData] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const filters = {
        start: searchParams.get("start") || "",
        end: searchParams.get("end") || "",
        type: searchParams.get("type") || "",
        destination: searchParams.get("destination") || "",
        city: searchParams.get("city") || "",
    };
    // update filters
    const updateFilters = (values) => {
        const params = new URLSearchParams();
        if (values.start) params.set("start", values.start);
        if (values.end) params.set("end", values.end);
        if (values.type) params.set("type", values.type);
        if (values.destination) params.set("destination", values.destination);
        if (values.city) params.set("destination", values.city);
        setSearchParams(params);
    };
    return (
        <section>
            <Header />
            {/* Start Page Content */}
            <div className="container">
                <FilterPanel mainData={mainData} defaultValues={filters} page={page} onFilter={updateFilters} setMainData={setMainData} setLoading={setLoading} />
                {
                    loading ? <Loading /> :
                        <HotelsGrid mainData={mainData} />
                }
                {/* pagination */}
                <HotelsPagination data={mainData.pagination} setPage={setPage} />
            </div>

            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Hotels
