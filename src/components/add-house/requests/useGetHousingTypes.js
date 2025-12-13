'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchHousingTypes = async () => {
  const headers = {};
  if (localStorage.getItem("token")) headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  const response = await axios.get(
    `${API_BASE_URL}/get-housing-type`,
    { headers }
  );
  return response.data.data;
}
export const useGetHousingTypes = () => {
  const query = useQuery({
    queryKey: ["housing-types"],
    queryFn: () => fetchHousingTypes(),
    // only run when we have lang and a country id
    // enabled: Boolean(lang) && (country !== undefined && country !== null),
    staleTime: 1000 * 60, // 1 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });
  return query;
};