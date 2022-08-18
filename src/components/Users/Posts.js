import styled from "styled-components";
import DataContext from "../../context/DataContext";
import SearchedUserContext from "../../context/SearchedUserContext";
import PostContext from "../../context/PostContext";
import { useContext, useEffect, useState } from "react";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { useAxios } from "../../hooks/useAxios";
import { PostCard, SkeletonLoading } from "./PostCard";

function Posts({ path, method }) {
  const { token } = useLocalstorage({ key: "linkrToken" });
  const [config, setConfig] = useState({
    method: method,
    path: path,
    config: [{ headers: { Authorization: `Bearer ${token}` } }],
  });

  const { response, error, loading } = useAxios(config);
  const [data, setData] = useState(null);
  const { setContextData } = useContext(DataContext);
  const { userId } = useContext(SearchedUserContext);
  const { newPost, setNewPost } = useContext(PostContext);

  useEffect(() => {
    handleError();
    // if (contextData !== null) {
    //   setData(contextData);
    //   setContextData(null);
    //   setNewPost(undefined);
    // } 
    if (data !== null) {
      setContextData(data);
      setNewPost(false);
    } 
    if (response !== null && !loading) {
      const data = response.data
      setData(data);
    }

    if(path !== method.path) {
      return setConfig({ ...config, path, method });
    }

    setConfig({
      method: "",
      path: "",
      config: { headers: { Authorization: `Bearer ${token}` } },
    });
  }, [response, loading, userId]);

  function handleError() {
    if (!loading) {
      if (error) {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      }
    }
  }

  function TimelineData() {
    if (data !== null && !loading) {
      return (
        data?.map((item, index) => (
          <PostCard key={index} id={item.id} props={item} />
        )) || <SkeletonLoading />
      );
    }
    return <SkeletonLoading />;
  }
  return (
    <PostsList>
      <TimelineData />
    </PostsList>
  );
}

const PostsList = styled.ul`
  width: 612px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h3 {
    color: white;
    font-size: larger;
    font-weight: 700;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export default Posts;
