import styled from "styled-components";
import HashtagCard from "../shared/HashtagCard";
import SearchedUserContext from "../../context/SearchedUserContext";
import ModalContext from "../../context/ModalContext";
import MetaData from "../Timeline/Metadata";
import { IoMdTrash } from "react-icons/io";
import { BsPencilFill } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAxios } from "../../hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactTooltip from 'react-tooltip';
import EditPostCard from "./EditPostCard";
import PostContext from "../../context/PostContext";

function AddLike({ addLiked, liked, nameWhoLiked , postId}) {
  if (liked)
    return (
      <>
        <FaHeart
          color={"red"}
          fontSize={"20px"}
          onClick={() => {
            addLiked();
          }}
        />
        <p data-tip='tooltip' data-for={`postLikes-${postId}`}>
        {`${nameWhoLiked.length} ${nameWhoLiked.length === 1 ? "like" : "likes"}`}
        </p>
      {nameWhoLiked.length > 0 && <ToolTip postId={postId} nameWhoLiked={nameWhoLiked} like={liked} />}
      </>
    );
  return (
    <>
      <FaRegHeart
        color={"while"}
        fontSize={"20px"}
        onClick={() => {
          addLiked();
        }}
      />
      <p data-tip='tooltip' data-for={`postLikes-${postId}`}>
        {`${nameWhoLiked?.length} ${nameWhoLiked?.length === 1 ? "like" : "likes"}`}
        </p>
      {nameWhoLiked?.length > 0 && <ToolTip postId={postId} nameWhoLiked={nameWhoLiked} like={liked} />}
      </>
  );
}

export function PostCard({ props }) {
  const {
    id,
    creatorId,
    pictureUrl,
    username,
    likes,
    description,
    metadata,
    usersWhoLiked,
    nameWhoLiked
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { showModal, setShowModal } = useContext(ModalContext);
  const { token, id: userId } = useLocalstorage({ key: "linkrToken" });
  const [config, setConfig] = useState({
    method: "",
    path: "",
    config: [null, { headers: { Authorization: `Bearer ${token}` } }],
  });
  const [liked, setLiked] = useState(
    usersWhoLiked?.includes(userId) ? true : false || false
  );
  const [likesC, setLike] = useState(Number(likes) || 0);
  const [ canEditPost, setCanEditPost ] = useState(false);
  const { response, loading, error } = useAxios(config);
  const { searchedUser, setSearchedUser } = useContext(SearchedUserContext);
  const { setPostId } = useContext(PostContext);
  let settings;

  useEffect(() => {
    if (response !== null) {
      if (response.status === 201) {
        setLiked(true);
        usersWhoLiked.push(userId);
        setLike(Number(likesC + 1));
      } else {
        setLiked(false);
        usersWhoLiked?.filter((i) => i === userId);
        setLike(Number(likesC - 1));
      }
    }
    setConfig({
      method: "",
      path: "",
      config: [null, { headers: { Authorization: `Bearer ${token}` } }],
    });
  }, [response]);

  function addLiked() {
    const data = { ...config };
    data.path = `likes/${id}`;
    data.method = "post";
    ReactTooltip.rebuild();
    setConfig(data);
  }

  if (
    location.pathname.includes("users") &&
    searchedUser.username !== username
  ) {
    setSearchedUser({ username, pictureUrl });
  }

  if(userId === creatorId) {
    settings = true;
  } else {
    settings = false;
  }

  function selectUser() {
    setSearchedUser({ username, pictureUrl });
    navigate(`/users/${creatorId}`);
  }

  function deletePost() {
    setShowModal(true);
    setPostId(id);
  }

  function editPost() {
    setCanEditPost(!canEditPost);
  }

  return (
    <>
    {
      id === null
      ?
      <h3>There are no posts yet</h3>
      :
      <Post>
        <LikePictureContainer>
          <img
            src={pictureUrl}
            alt={username && `${username}'s profile`}
            onClick={selectUser}
          />
          <LikeContainer>
            <AddLike addLiked={addLiked} nameWhoLiked={nameWhoLiked} liked={liked} postId={id}></AddLike>
          </LikeContainer>
        </LikePictureContainer>
        <PostDataContainer>
            <div>
                <h3>{username}</h3>
                {
                settings
                ?
                <EditDeleteButtons>
                  <BsPencilFill style={{ marginRight: "10px"}} fontSize="20px" onClick={ editPost } />
                  <IoMdTrash  fontSize="25px" onClick={ deletePost } />
                </EditDeleteButtons>
                :
                <></>
              }
            </div>
            {
              canEditPost
              ?
              <EditPostCard
                postDescription={ description }
                postId={ id }
                setCanEditPost={ setCanEditPost }
              />
              :
              <p>{description && <HashtagCard text={description} />}</p>
            }
          <MetaData metadata={metadata} />
        </PostDataContainer>
      </Post>
    }
    </>
  );
}

const ToolTip = ({ postId, nameWhoLiked, like }) => {
  return (
    <ReactTooltip
      id={`postLikes-${postId}`}
      place="bottom"
      effect="solid"
      backgroundColor={"rgba(255, 255, 255, 0.9)"}
      textColor={"#505050"}
    >
      {
        (nameWhoLiked.length === 1 && like) ? <span>You</span>
          : (nameWhoLiked.length === 1 && !like) ? <span>{nameWhoLiked[0]}</span>
            : (nameWhoLiked.length === 2 && like) ? <span>You and {nameWhoLiked[0]}</span>
              : (nameWhoLiked.length === 2 && !like) ? <span>{nameWhoLiked[0]} and {nameWhoLiked[1]}</span>
                : (nameWhoLiked.length > 2 && like) ? <span>You, {nameWhoLiked[0]} and other {nameWhoLiked.length - 2} people</span>
                  : (nameWhoLiked.length > 2 && !like) ? <span>{nameWhoLiked[0]}, {nameWhoLiked[1]} and other {nameWhoLiked.length - 2} people</span>
                    : ''
      }
    </ReactTooltip>
  );
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

const Post = styled.li`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-grow: 1;
  border-radius: 16px;
  color: #ffffff;
  background-color: #171717;
  padding: 18px 0;
  margin-bottom: 10px;
  position: relative;

  @media screen and (max-width: 900px) {
    width: 100vw;
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
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  padding: 0 20px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  div > h3 {
    width: 100%;
    font-size: 20px;
    word-wrap: break-word;
  }

  p {
    width: 100%;
    font-size: 18px;
    margin: 18px 0 16px 0;
    color: #b7b7b7;
    font-weight: 300;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
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

const EditDeleteButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;
`;
