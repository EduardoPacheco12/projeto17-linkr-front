import styled from "styled-components";
import DataContext from "../../context/DataContext";
import SearchedUserContext from "../../context/SearchedUserContext";
import PostContext from "../../context/PostContext";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { useAxios } from "../../hooks/useAxios";
import { PostCard, SkeletonLoading } from "./PostCard";
import { ThreeDots } from "react-loader-spinner";

function Posts({ path }) {
  const { token } = useLocalstorage({ key: "linkrToken" });
  const [page, setPage] = useState(1);
  const [config, setConfig] = useState({});
  const { response, error, loading } = useAxios(config);
  const [data, setData] = useState([]);
  const { setContextData } = useContext(DataContext);
  const { userId } = useContext(SearchedUserContext);
  const { newPost, setNewPost } = useContext(PostContext);
  const [postsLeft, setPostsLeft] = useState(0);

  const observer = useRef();
  const lastPostRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && postsLeft > 0) {
        setPage(prevPage => prevPage + 1);
      }
    })
    if(node) observer.current.observe(node);
  }, [loading, postsLeft]);

  useEffect(() => {
    const newConfig = {
      method: 'get',
      path: path,
      config: [{ headers: { Authorization: `Bearer ${token}` } }],
      query: `?page=${page}`,
    };
    setConfig(newConfig)
  }, [page])

  useEffect(() => {
    if(!loading) {
      if (data.length !== 0) {
        setContextData(data);
        setNewPost(false);
      } 
      if (response !== null) {
        setPostsLeft(Number(response?.data[0]?.tableLength) - response?.data?.length)
        setData((data) => [...data, ...response.data]);
      }
    }
    handleError();
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

  const PostItems = () => (
    <>
      {data?.map((item, index) => <PostCard key={index} id={item.id} props={item} />)}
      <Observer ref={lastPostRef}>{postsLeft > 0 ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : <h3>There are no more posts to load</h3>}</Observer>
    </>
  );

  function TimelineData() {
    if (data === null) return <SkeletonLoading />; 
    if (data?.length === 0) return <h3>There are no posts yet</h3>;
    return <PostItems />;
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

const Observer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 20px;
  color: #FFFFFF;
  text-align: center;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 20px;
  }
`

export default Posts;
