import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BACKEND_URI;

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export function useAxios({ path = '', method = '', config = null }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(path);

  const axiosMethod = async () => {
    try {
      setLoading(true)
      const axios = methods[method];
      // console.log(`${BASE_URL}/${path}`, config?.[0], config?.[1]);
      const response = await axios(`${BASE_URL}/${path}`, config?.[0], config?.[1]);
      setResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    console.log("no useEffect")
    if(!(method === '')) {
      axiosMethod();
    }
  }, [ path, method, config ]);

  return { response, error, loading };
}
