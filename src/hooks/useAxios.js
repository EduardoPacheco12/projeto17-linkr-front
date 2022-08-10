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
  const [loading, setLoading] = useState(true);

  const axiosMethod = async () => {
    try {
      const method = methods[props.method];
      const {
        path = undefined,
        header = undefined,
        body = undefined,
        query = undefined,
        params = undefined,
      } = props;
      const fullPath = params ? `${path}/${params}` : `${path}`;
      const config = {
        header: {
          Authorization: `Bearer `,
        },
      };
      const response = await method(`${BASE_URL}/${fullPath}`);
      setResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosMethod();
    // eslint-disable-next-line
  }, []);

  return { response, error, loading };
}
