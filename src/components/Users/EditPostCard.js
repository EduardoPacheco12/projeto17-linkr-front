import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { useAxios } from "../../hooks/useAxios";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import PostContext from "../../context/PostContext";
import useIsMounted from "../shared/useIsMounted";

function EditPostCard({ postDescription, postId, setCanEditPost }) {
  const { token } = useLocalstorage({ key: 'linkrToken' });
  const [ description, setDescription ] = useState(postDescription);
  const [ config, setConfig ] = useState({ path: "", method: "", config: null});
  const { response, error, loading } = useAxios(config);
  const { setNewPost } = useContext(PostContext);
  const textareaRef = useRef(null);
  const isMountedRef = useIsMounted();

  useEffect(() => {
    textareaRef.current.focus();

    if(isMountedRef && !loading && response !== null) {
      setNewPost(true);
    } else if(error) {
      alert("Não foi possível salvar as alterações");
    }
  // eslint-disable-next-line
  }, [ response, loading, error, isMountedRef ]);

  function readKey(e) {
    const key = e.key;

    if(key.toLowerCase() === "escape") {
      setCanEditPost(false);
    } else if(key.toLowerCase() === "enter") {
      sendDescription();
    }
  }

  function sendDescription() {
    const path = `posts/${ postId }`;

    const header = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const body = {
      description: description.trim()
    }

    setConfig({ path , method: "patch", config: [ body, header ]});
  }

  return (
    <PostTextArea
      ref={ textareaRef }
      value={ description }
      disabled={ loading }
      rows="3"
      onChange={ e => setDescription(e.target.value) }
      onKeyUp={ readKey }
      onFocus={(e)=> e.currentTarget.setSelectionRange(description.length, description.length)}
    />
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

  :disabled {
    background-color: #C9C9C9;
    border: 1px solid #A84E32;
  }

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