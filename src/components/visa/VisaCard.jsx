import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../lib/apiConfig";

const VisaCard = ({ item }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/settings`, {});
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

  return (
    <Card className="shadow-none border-none ">
      <CardHeader className="p-0 " >
        <div className="p-0  flex items-center justify-between">

          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M35.625 9.6001V16.6808" stroke="#130F26" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35.625 46.7837V52.7042" stroke="#130F26" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35.625 38.7839V24.6809" stroke="#130F26" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd" d="M57.3327 37.4677C50.1575 37.4677 50.1575 26.5297 57.3327 26.5297C57.3327 13.8565 57.3327 9.33325 31.9993 9.33325C6.66602 9.33325 6.66602 13.8565 6.66602 26.5297C13.8413 26.5297 13.8413 37.4677 6.66602 37.4677C6.66602 50.1434 6.66602 54.6666 31.9993 54.6666C57.3327 54.6666 57.3327 50.1434 57.3327 37.4677Z" stroke="#130F26" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-3xl font-bold text-main-blue " dir="ltr">
            {parseFloat(item?.price).toFixed(1)}<span className="text-xs">{item.currencyName}</span>
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <h2 className="font-bold text-xl my-8">{item?.title}</h2>
        <h3 className="font-bold text-base my-8">{item?.period}</h3>
        <ul className="space-y-4">
          {item?.elements.map((element, i) => (

            <li key={i} className="flex items-center gap-2">
              <TbSquareRoundedCheckFilled className="text-main-blue" />
              <p className="text-sm font-semibold">
                {element}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-0 mt-8 flex items-center gap-2">
        <Link to={`/visa/${item?.id}`} className="w-1/2   py-3 m-auto  bg-main-blue  !text-white  text-xs font-semibold flex items-center justify-center rounded-full hover:bg-main-purple transation-all duration-300">  عرض التفاصيل</Link>
        <Link to={`https://wa.me/${data.whatsapp}?text= اريد مناقشتكم بخصوص ${item?.title}`} className="w-1/2   py-3 m-auto  bg-main-purple  !text-white  text-xs font-semibold flex items-center justify-center rounded-full hover:bg-main-blue transation-all duration-300">
          قدم طلبك الآن
        </Link>
      </CardFooter>
    </Card>
  )
}
export default VisaCard