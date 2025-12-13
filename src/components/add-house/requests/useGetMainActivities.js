'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchMainActivities = async () => {
  const headers = {};
  if (localStorage.getItem("token")) headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  const response = await axios.get(
    `${API_BASE_URL}/get-main-activities`,
    { headers }
  );
  return response.data.data;
}
export const useGetMainActivities = () => {
  const query = useQuery({
    queryKey: ["main-activities"],
    queryFn: () => fetchMainActivities(),
    // only run when we have lang and a country id
    // enabled: Boolean(lang) && (country !== undefined && country !== null),
    staleTime: 1000 * 60, // 1 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });
  return query;
};