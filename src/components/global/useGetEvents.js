'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchEvents = async (selectedCountry, selectedCity) => {
  const headers = {};

  if (localStorage.getItem("token")) headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  const response = await axios.get(
    `${API_BASE_URL}/events?page=1&country_id=${selectedCountry || ""}&city_id=${selectedCity || ""}`,
    { headers }
  );
  return response.data.data;

}

export const useGetEvents = (selectedCountry, selectedCity) => {

  const query = useQuery({
    queryKey: ["events", selectedCountry, selectedCity],
    queryFn: () => fetchEvents(selectedCountry, selectedCity),
    // only run when we have lang and a country id
    // enabled: Boolean(lang) && (country !== undefined && country !== null),
    staleTime: 1000 * 60, // 1 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });

  return query;
};
