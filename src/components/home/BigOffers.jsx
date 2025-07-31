
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../lib/apiConfig';
const BigOffers = ({ mainData }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/offers`, {});
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving data:', error);
                setLoading(false);
                throw new Error('Could not get data');
            }
        };
        getData();
    }, [])

    console.log(data);
    return (
        <section className="big-offers-section">
            <div className="container">
                <h2>عــروض رهيـبة ومميــزات كثيــرة</h2>
                <p>سواء كنت تحلم بالسفر إلى أوروبا، آسيا، إفريقيا، أستراليا أو أمريكا، نوفر لك خيارات إقامة متنوعة بأسعار تناسب ميزانيتك.</p>
            </div>
        </section>
    )
}

export default BigOffers
