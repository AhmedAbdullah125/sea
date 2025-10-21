'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchingPreVisas = async () => {
  const token = sessionStorage.getItem("token");
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await axios.get(
    `${API_BASE_URL}/travel-visa`,
    { headers }
  );
  return response.data.data;

}

export const PrevisaQuery = () => {

  const query = useQuery({
    queryKey: ["previsa"],
    queryFn: () => fetchingPreVisas(),
    // only run when we have lang and a country id
    staleTime: 1000 * 60 * 5, // 5 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });

  return query;
};
