import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { HiRefresh } from "react-icons/hi";
import { useAxios } from "../../hooks/useAxios";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import useInterval from "use-interval";
import PostContext from "../../context/PostContext";

function NewPostsAlert({ lastPost }) {
  const [ config, setConfig ] = useState({});
  const { response, error, loading } = useAxios(config);
  const [ qtdNewPosts, setQtdNewPosts ] = useState(0);
  const { token } = useLocalstorage({ key: "linkrToken" });
  const { setNewPost } = useContext(PostContext);

  useEffect(() => {
    if(response !== null && response !== undefined) {
      if(response.data.qtdNewPosts !== 0) {
        setQtdNewPosts(response.data.qtdNewPosts)
      }
    }
  }, [ response, error ]);

  useInterval(() => {
    const body = {
      lastPostTime: lastPost?.postTime
    }

    setConfig(
      {
        path: "qtd-new-posts",
        method: "post",
        config:[body, { headers: { Authorization: `Bearer ${token}` } }]
      }
    );
  }, 15000);

  return (
    <NewPostsButton qtdNewPosts={ qtdNewPosts } onClick={() => setNewPost(true)}>
      { `${ qtdNewPosts } new posts, load more!` }
      <HiRefresh style={{ marginLeft: "14px", fontSize: "20px"}} />
    </NewPostsButton>
  );
}

const NewPostsButton = styled.button`
  display: ${({ qtdNewPosts }) => qtdNewPosts === 0 ? "none" : "flex"};
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  max-width: 100vw;
  margin-bottom: 18px;
  padding: 20px;
  cursor: pointer;
  background-color: #1877F2;
  border: none;
  border-radius: 16px;
  font-family: "Lato";
  font-size: 18px;
  color: #FFFFFF;
`;

export default NewPostsAlert;