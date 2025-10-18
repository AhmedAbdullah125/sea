'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchSingleBlog = async (lang, slug) => {
  const token = localStorage.getItem("token");
  const headers = {
    "accept-language": lang,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await axios.get(
    `${API_BASE_URL}/blog/${slug}`,
    { headers }
  );
  return response.data.data;

}

export const SingleBlogQuery = (lang, slug) => {

  const query = useQuery({
    queryKey: ["blog", lang, slug],
    queryFn: () => fetchSingleBlog(lang, slug),
    // only run when we have lang and a country id
    enabled: Boolean(lang),
    staleTime: 1000 * 60 * 5, // 5 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });

  return query;
};
