import styled from "styled-components";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { useEffect, useState, useContext } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostContext from "../../context/PostContext";

function Trends() {
  const navigate = useNavigate();
  const { token } = useLocalstorage({ key: 'linkrToken' });
  const [config, setConfig] = useState({ method: 'get', path: 'hashtag', config: { headers: { Authorization: `Bearer ${token}` } }});
  const [data, setData] = useState(null);
  const { response, error, loading } = useAxios(config);
  const { newPost, setNewPost } = useContext(PostContext);

  useEffect(() => {

    handleError();
    if(response !== null) {
      setData(response.data);
      setNewPost(false);
    }

    if(newPost && !loading) {
      setConfig(
        {
          method: 'get',
          path: 'hashtag',
          config: { headers: { Authorization: `Bearer ${token}` } }
        });
    }
  // eslint-disable-next-line
  }, [ response, loading, newPost ])

  function handleError() {
    if (!loading) {
      if (error?.response.status) {
        const status = error?.response.status;
        switch (status) {
          case 401:
            alert("Session expired, please try again");
            // limpa o local storage e desloga
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

  const Trending = () => {
    if(data === null || loading) {
      return (
        <li>
        <Skeleton width={"95%"} height={20} />
      </li>
      )
    }
    if(data?.length === 0) {
      return <li>There are no trends yet</li>
    } else {
      return data.map((i, id) => <li key={id} onClick={() => navigate(`/hashtag/${i.hashtag}`)}>#{i.hashtag}</li>)
    }
  }

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#5A5A5A">
      <TrendBorder>
        <h3>trending</h3>
        <TopTrendsList>
          <Trending />
        </TopTrendsList>
      </TrendBorder>
    </SkeletonTheme>
  );
}

const TrendBorder = styled.div`
  display: flex;
  max-width: 300px;
  flex-grow: 1;
  flex-direction: column;
  background-color: #171717;
  color: #ffffff;
  border-radius: 16px;
  margin-left: 25px;
  box-sizing: border-box;

  h3 {
    margin: 18px 0 14px 18px;
    font-size: 28px;
    font-weight: bold;
    font-family: "Oswald";
  }

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const TopTrendsList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 10px 0 20px 0;
  border-top: solid 1px #ffffff;

  li {
    margin: 10px 0 0 18px;
    padding-bottom: 5px;
    font-size: 20px;
    font-family: "Lato";
    font-weight: bold;
    cursor: pointer;
  }
`;

export default Trends;
