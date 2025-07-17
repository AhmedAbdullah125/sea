import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../lib/apiConfig';
import Loading from './loading/Loading';
import parse from 'html-react-parser';
import Breadcrumbs from './home/BreadCrumbs';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import termsImg from '../../public/app/terms.svg';
import policyImg from '../../public/app/policy.svg';

const GeneralPage = ({ title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/pages`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, []);
    console.log(data);
    console.log(title);

    return (
        <div className="container">
            <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: title == "terms_and_conditions" ? "الشروط والاحكام" : "سياسة الخصوصية", href: title == "terms_and_conditions" ? "/terms" : "privacy" }]} />
            {
                loading ? <Loading /> :

                    <div className="terms-container mt-4">
                        <div className="terms-content">
                            <p className="content-pargh">{title == "terms_and_conditions" ? parse(data?.terms_and_conditions) : parse(data?.privacy)}</p>
                        </div>
                        <figure className="terms-img">
                            <LazyLoadImage src={title == "terms_and_conditions" ? termsImg : policyImg} alt={title} />
                        </figure>
                    </div>
            }
        </div>
    )
}

export default GeneralPage
