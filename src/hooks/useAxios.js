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

export function useAxios({ path = '', method = '', config = null, query = '' }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosMethod = async () => {
    try {
      setLoading(true);
      const axios = methods[method];
      const response = await axios(`${BASE_URL}/${path}${query}`, config?.[0], config?.[1]);
      setResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setError(null);
      setResponse(null);
    }
  };


  useEffect(() => {
    if(method !== '') {
      axiosMethod();
    }
    // eslint-disable-next-line
  }, [ path, method, config, query ]);

  return { response, error, loading };
}
