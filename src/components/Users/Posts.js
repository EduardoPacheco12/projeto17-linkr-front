import styled from "styled-components";
import HashtagCard from "../shared/HashtagCard";
import MetaData from "../Timeline/Metadata";
import DataContext from "../../context/DataContext";
import SearchedUserContext from "../../context/SearchedUserContext";
import { IoMdTrash } from "react-icons/io";
import { BsPencilFill } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAxios } from "../../hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PostCard({ props }) {
  const {
    id,
    creatorId,
    pictureUrl,
    username,
    likes,
    description,
    metadata,
    usersWhoLiked,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { token, id: userId } = useLocalstorage({ key: "linkrToken" });
  const [config, setConfig] = useState({
    method: "",
    path: "",
    config: { headers: { Authorization: `Bearer ${token}` } },
  });
  const [liked, setLiked] = useState(usersWhoLiked?.includes(userId) ? true: false || false);
  const [likesC, setLike] = useState(Number(likes));
  const { response, loading, error } = useAxios(config);
  const { searchedUser, setSearchedUser } = useContext(SearchedUserContext);
  let settings;

  useEffect(() => {
    if (response !== null) {
      if (response.status === 201) {
        setLiked(true);
        usersWhoLiked.push(userId);
        setLike(Number(likesC + 1));
      } else {
        setLiked(false);
        usersWhoLiked.filter((i) => i === userId);
        setLike(Number(likesC - 1));
      }
    }
    setConfig({
      method: "",
      path: "",
      config: { headers: { Authorization: `Bearer ${token}` } },
    });
  }, [response]);

  if (
    location.pathname.includes("users") &&
    searchedUser.username !== username
  ) {
    setSearchedUser({ username, pictureUrl });
  }

  if (userId === creatorId) {
    settings = true;
  } else {
    settings = false;
  }

  function selectUser() {
    setSearchedUser({ username, pictureUrl });
    navigate(`/users/${creatorId}`);
  }

  function deletePost() {}

  return (
    <Post>
      <LikePictureContainer>
        <img
          src={pictureUrl}
          alt={username && `${username}'s profile`}
          onClick={selectUser}
        />
        <LikeContainer>
          <AddLike postId={id}></AddLike>
        </LikeContainer>
      </LikePictureContainer>
      <PostDataContainer>
        <h3>{username}</h3>
        <p>{description && <HashtagCard text={description} />}</p>
        <MetaData metadata={metadata} />
      </PostDataContainer>
      {settings === true ? (
        <BsPencilFill
          style={{ position: "absolute", right: "60px", top: "15px" }}
          fontSize="20px"
          color="#FFFFFF"
        />
      ) : null}
      {settings === true ? (
        <IoMdTrash
          style={{ position: "absolute", right: "20px", top: "15px" }}
          fontSize="25px"
          color="#FFFFFF"
          onClick={deletePost}
        />
      ) : null}
    </Post>
  );

  function AddLike() {
    function addLiked() {
      const data = { ...config };
      data.path = `likes/${id}`;
      data.method = "post";
      data.config = [null, data.config];
      setConfig(data);
    }

    const LikeHeart = () =>
    liked ? (
        <>
          <FaHeart
            color="red"
            fontSize={"20px"}
            onClick={() => {
              addLiked();
            }}
          />
          <p>{likesC} likes</p>
        </>
      ) : (
        <>
          <FaRegHeart
            color={"while"}
            fontSize={"20px"}
            onClick={() => {
              addLiked();
            }}
          />
          <p>{likesC} likes</p>
        </>
      );

    return (
      <>
        <LikeHeart />
      </>
    );
  }
}

export function SkeletonLoading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#5A5A5A">
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
            <Skeleton width={"100%"} height={160} count={1} />
          </p>
        </PostDataContainer>
      </Post>
    </SkeletonTheme>
  );
}

function Posts({ path, method }) {
  const { token } = useLocalstorage({ key: "linkrToken" });
  const [config, setConfig] = useState({
    method: method,
    path: path,
    config: [{ headers: { Authorization: `Bearer ${token}` } }],
  });
  const { response, error, loading } = useAxios(config);
  const [data, setData] = useState(null);
  const { contextData, setContextData } = useContext(DataContext);
  const { userId } = useContext(SearchedUserContext);

  useEffect(() => {
    handleError();
    if (response !== null) {
      setData(response.data);
      setContextData(response.data);
    }
    if (contextData !== null) {
      setData(contextData);
      setContextData(null);
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
      if (data.length === 0) {
        return <h3>There are no posts yet</h3>;
      } else {
        return data?.map((item, index) => (
          <PostCard key={index} id={item.id} props={item} />
        )) || <SkeletonLoading />;
      }
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

const Post = styled.li`
  display: flex;
  width: 100%;
  flex-grow: 1;
  border-radius: 16px;
  color: #ffffff;
  background-color: #171717;
  padding: 18px 0;
  margin-bottom: 10px;
  position: relative;

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
    cursor: pointer;
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

  svg {
    color: #fff;
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

  span {
    font-weight: bold;

    :hover {
      cursor: pointer;
    }
  }
`;

export default Posts;
