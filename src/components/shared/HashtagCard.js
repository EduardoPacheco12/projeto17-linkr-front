import ReactHashtag from "@mdnm/react-hashtag";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { useAxios } from "../../hooks/useAxios";
import { useLocalstorage } from "../../hooks/useLocalstorage";

export default function HashtagCard({ text }) {
  const navigate = useNavigate();
  const { token } = useLocalstorage({ key: "linkrToken" });
  const [config, setConfig] = useState({ method: '', path: ''});
  const { setContextData } = useContext(DataContext);
  const [path, setPath] = useState('');
  const { response, error, loading } = useAxios(config);

  useEffect(() => {
    handleError();
    if(response !== null) {
      setContextData(response.data);
      navigate(`/hashtag/${path}`)
    }
  }, [response, loading])

  function handleError() {
    if (!loading) {
      if (error?.response.status) {
        const status = error?.response.status;
        switch (status) {
          case 401:
            alert("Session expired, please try again");
            // limpa o local storage e desloga
            break;
          case 422:
            alert("Please fill in all fields");
            break;
          case 500:
            alert("Server Error!!!");
            break;
          default:
            break;
        }
      }
    }
  }

  function handleConfig(t) {
    const data = [{ headers: { Authorization: `Bearer ${token}` } }]
    console.log(t);
    const path = `hashtag/${t.replace("#", "")}`
    setConfig({
      method: 'get',
      path: path,
      config: data
    })
    setPath(t);
  }

  return (
    <ReactHashtag
      onHashtagClick={(val) => handleConfig(val)}
    >
      { text }
    </ReactHashtag>
  );
}