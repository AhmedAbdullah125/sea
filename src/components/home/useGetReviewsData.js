'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchReviews = async () => {
  const headers = {  };
  if (sessionStorage.getItem("token")) headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
  const response = await axios.get(
    `${API_BASE_URL}/customer-reviews`,
    { headers }
  );
  return response.data.data;

}

export const useGetReviewsData = () => {

  const query = useQuery({
    queryKey: ["reviews" ],
    queryFn: () => fetchReviews(),
    // only run when we have lang and a country id
    // enabled: Boolean(lang) && (country !== undefined && country !== null),
    staleTime: 1000 * 60, // 1 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });

  return query;
};
