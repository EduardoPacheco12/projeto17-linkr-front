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
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const axiosMethod = async () => {
    try {
      // WHAT IF AXIOS METHOD CALLS RECEIVES ONLY 
      // METHOD
      // PATH AS A FULL PATH (WITH ROUTE, PARAMS AND QUERY) AND 
      // CONFIG (WITH HEADER, BODY OR NEITHER)?
      // THEN THIS CAN BE SET AS USEEFFECT UPDATE CONDITION ?
      setLoading(true)
      const axios = methods[method];
      const response = await axios(`${BASE_URL}/${path}`, config);
      console.log(response);
      setResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!(method === '')) {
      axiosMethod();
    }
  }, [method, config]);

  return { response, error, loading };
}
