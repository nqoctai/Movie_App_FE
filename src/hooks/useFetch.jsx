/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

export default function useFetch({ url = "", method = "GET", headers = {} }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMovieById = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
        },
      });
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    };
    fetchMovieById();
  }, [url, method, JSON.stringify(headers)]);

  return { isLoading, data };
}
