import { useEffect, useState } from "react";

const useFetch = (url: string, method: string, body?: {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestOptions = {
    method: method,
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    const fetchResource = async () => {
      try {
        let res = await fetch(url, requestOptions);
        let data = await res.json();
        setData(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    };
    fetchResource();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
