import { useState } from "react";
import styled from "styled-components";
import { useAxios } from "../../hooks/useAxios";
import { useLocalstorage } from "../../hooks/useLocalstorage";

function EditPostCard({ postDescription, postId }) {
  const token = useLocalstorage({ key: 'linkrToken' });
  const [ description, setDescription ] = useState(postDescription);
  const [ config, setConfig ] = useState({ path: "", method: "", config: null});
  const { response, error, loading } = useAxios(config);

  function sendDescription() {
    const path = `/posts/${ postId }`;

    const header = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const body = {
      description
    }

    setConfig({ path , method: "patch", config: [header, body]});
  }

  return (
    <PostTextArea value={ description } rows="3" onChange={ e => setDescription(e.target.value) } />
  );
}

const PostTextArea = styled.textarea`
  width: 100%;
  margin: 8px 0;
  padding: 4px 10px;
  font-family: "Lato";
  font-size: 14px;
  color: #4C4C4C;

  border-radius: 10px;
  border: none;
  overflow: auto;
  outline: none;
  
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;

  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: #EFEFEF;
    padding-right: 1px;
    margin: 1px 20px;
  }

  ::-webkit-scrollbar-thumb {
    border: 2px #EFEFEF solid;
    background: #333333;
    border-radius: 4px;
  }
`;

export default EditPostCard;