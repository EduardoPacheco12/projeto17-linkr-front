import styled from "styled-components";
import HashtagCard from "../shared/HashtagCard";
import { FaRegHeart } from "react-icons/fa";
import { useAxios } from "../../hooks/useAxios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MetaData from "../Timeline/Metadata";
import { useEffect, useState } from "react";
import axios from "axios";


function PostCard({ props }) {
  const {
    pictureUrl,
    username,
    likeCount,
    description,
    metadata
  } = props;
  console.table(props);

  return (
    <Post>
      <LikePictureContainer>
        <img src={pictureUrl} alt={username && `${username}'s profile`} />
        <LikeContainer>
          <FaRegHeart color="#FFFFFF" fontSize={"20px"} />
          <p>{likeCount} likes</p>
        </LikeContainer>
      </LikePictureContainer>
      <PostDataContainer>
        <h3>{username}</h3>
        <p>{description && <HashtagCard text={description} />}</p>
        <MetaData metadata={metadata} />
      </PostDataContainer>
    </Post>
  );
}

export function SkeletonLoading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#5A5A5A" >
      <Post>
        <LikePictureContainer>
          <div>
            <Skeleton width={50} height={50} />
          </div>
          <LikeContainer>
            <FaRegHeart color="#FFFFFF" fontSize={"20px"} />
            <p>
              <Skeleton width={50} height={10} />
            </p>
          </LikeContainer>
        </LikePictureContainer>
        <PostDataContainer>
          <h3>
            <Skeleton width={"100%"} height={20} />
          </h3>
          <p>
            <Skeleton width={"100%"} height={18} count={5} />
          </p>
        </PostDataContainer>
      </Post>
    </SkeletonTheme>
  );
}


function Posts({ path, method, id }) {
  const [ posts, setPosts ] = useState([]);
  
  async function getPosts() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/posts/${id}`);

      setPosts(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  // const { response, error, loading } = useAxios({
  //   path: path,
  //   method: method,
  // });

  // const TimelineData = () => !loading ? response?.data.map((item, index) => <PostCard key={index} id={item.id} props={item} />) : <></>;
  const TimelineData = () => posts.length !== 0 ? posts.map((item, index) => <PostCard key={index} id={item.id} props={item} />) : <></>;

  return (
    <PostsList>
      {
        posts
        ?
        <TimelineData />
        :
        <></>
      }
    </PostsList>
  );
}

const PostsList = styled.ul`
  width: 612px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Post = styled.li`
  display: flex;
  width: 100%;
  flex-grow: 1;
  border-radius: 16px;
  color: #FFFFFF;
  background-color: #171717;
  padding: 18px 0;
  margin-bottom: 10px;

  @media screen and (max-width: 900px) {
    border-radius: 0;
    padding: 10px 0 14px 0;
  }
`;

const LikePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
  margin-left: 18px;
  box-sizing: border-box;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 40px;
    height: auto;
  }
`;

const LikeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;

  p {
    margin-top: 6px;
    text-align: center;
    font-size: 10px;
  }
`;

const PostDataContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px;

  h3 {
    width: 100%;
    font-size: 20px;
  }

  p {
    width: 100%;
    font-size: 18px;
    margin: 18px 0 16px 0;
    color: #b7b7b7;
    font-weight: 300;
  }

  @media screen and (max-width: 900px) {
    h3 {
      font-size: 18px;
    }

    p {
      font-size: 16px;
      margin-top: 8px;
    }
  }
`;

export default Posts;
