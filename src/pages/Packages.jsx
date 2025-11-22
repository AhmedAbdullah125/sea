import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../lib/apiConfig';
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useSearchParams } from 'react-router-dom';
import PackagesGrid from '../components/packages.jsx/PackagesGrid';
import FilterPanel from '../components/packages.jsx/FilterPanel';
const Packages = () => {
    // state for search params
    const [searchParams, setSearchParams] = useSearchParams();
    const [mainData, setMainData] = useState([])
    const filters = {
        start: searchParams.get("start") || "",
        end: searchParams.get("end") || "",
        type: searchParams.get("type") || "",
        destination: searchParams.get("destination") || "",
    };
    // update filters
    const updateFilters = (values) => {
        const params = new URLSearchParams();
        if (values.start) params.set("start", values.start);
        if (values.end) params.set("end", values.end);
        if (values.type) params.set("type", values.type);
        if (values.destination) params.set("destination", values.destination);
        setSearchParams(params);
    };

    return (
        <section>
            <Header />
            {/* Start Page Content */}
            <div className="container">
                <FilterPanel defaultValues={filters} onFilter={updateFilters} setMainData={setMainData} />
                <PackagesGrid mainData={mainData} />
            </div>

            {/* End Page Content */}
            <Footer />
        </section>
    )
}

export default Packages
