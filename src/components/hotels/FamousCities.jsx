import React from "react";
import { useGetCities } from "../global/useGetCities";
import { Marquee } from "@/components/ui/marquee";

const FamousCities = () => {
  const { data: cities, isLoading } = useGetCities();

  if (isLoading) return null; // or a loader

  return (
    <div className="lower-hotels mb-8" style={{direction: 'ltr'}}>
      <div className="big-offers-section relative" >
        <div className="relative" id="big-offers">
          <h6>أخر 10 ايــــــام !.</h6>
          <h2>مدن مشهورة خلال الأسبوع الفائت</h2>
          <p>قد تكون هذه المدن ممتعةً لك أيضا!</p>
        </div>
      <Marquee pauseOnHover className="mt-8 [--duration:50s]" >
        {cities?.map((city, index) => (
          <div className="grid-item marquee-card" key={index}>
            <div className="item-cont">
              <div className="img-cont">
                <img src={city.image} alt={city.name} loading="lazy" />
                <div className="overlay">
                  <h4>– {city.name}</h4>
                  <p>
                    <i className="fa-solid fa-star" />
                    <span>{city.rating || "5.0"}</span>
                    <span>( {city.total_rating ? city.total_rating : "500+"} )</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="arrow-cont">
              <div className="i-cint">
                <i className="fa-solid fa-arrow-left" />
              </div>
            </div>
          </div>
        ))}
      </Marquee>
      </div>

    </div>
  );
};

export default FamousCities;
