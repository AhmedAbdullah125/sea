import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { MdStars } from "react-icons/md";
import { API_BASE_URL } from '../../../lib/apiConfig';
import Loading from '../../loading/Loading';
import arrowTopLeft from '../../../assets/arrToLf.svg'
import appLogo from '../../../assets/app-logo.png'
import { Link } from 'react-router-dom';

const TransportForm = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    //scroll to the top of page 
    window.scrollTo(0, 0);
    const getData = async () => {
      try {

        const response = await axios.get(`${API_BASE_URL}/choose-service`, {});
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
  return (
    <section className="transport-form">
      <div className="text-main-navy flex items-center gap-1 mb-5">
        <MdStars className="xl:text-xl text-base" />
        <h2 className=" font-bold max-xl:text-sm">إخــتر خدمتــك !.</h2>
      </div>
      {
        loading ? <Loading /> :
          <div className='serv-cont'>
            {
              data.map((item) => (
                <div className="serv-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="l-side">
                    <Link to="https://apps.apple.com/eg/app/sea/aaa">
                      <img src={arrowTopLeft} alt="" />
                    </Link>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))
            }
          </div>
      }
      <Link to="https://apps.apple.com/eg/app/sea/aaa" className="app-go-to">
        <span>عبر تطبيــق </span>
        <img src={appLogo} alt="Sea" />
      </Link>

    </section>
  )
}

export default TransportForm
