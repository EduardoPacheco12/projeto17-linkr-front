import axios from "axios";
import { useEffect, useState } from "react";
import { useToggle } from "./useToggle";

const BASE_URL = process.env.REACT_APP_BACKEND_URI;

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export function useAxios(props) {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] =  useState(true);

  const axiosMethod = async() => {
    try {
        const method = methods[props.method];
        const { path = undefined, header = undefined, body = undefined } = props;
        const response = await method(`${BASE_URL}/${path}`,);
        setResponse(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    axiosMethod()
  }, [])

  return { response, error, loading };
}
