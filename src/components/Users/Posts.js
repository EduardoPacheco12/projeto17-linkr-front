import styled from "styled-components";
import HashtagCard from "../shared/HashtagCard";
import { FaRegHeart } from "react-icons/fa";
import { useAxios } from "../../hooks/useAxios";
import { useToggle } from "../../hooks/useToggle";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PostCard(props) {
  const {
    img,
    username,
    likeCount,
    text = "Pellentesque #habitant morbi #tristique senectus et #netus et malesuada",
  } = props;
  return (
    <Post>
      <LikePictureContainer>
        <img src={img} alt={username && `${username}'s profile`} />
        <LikeContainer>
          <FaRegHeart color="#FFFFFF" fontSize={"20px"} />
          <p>{likeCount} likes</p>
        </LikeContainer>
      </LikePictureContainer>
      <PostDataContainer>
        <h3>{username}</h3>
        <p>{text && <HashtagCard text={text} />}</p>
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

function Posts() {
  const { response, error, loading } = useAxios({
    path: "timeline",
    method: "get",
  });
  // const
  // TEMPLATE PARA ADICAO DA REQUISICAO NO FUTURO, TEXT PASSA A SER ARRAY E IMPRIME OS POSTS NA TELA

  const TimelineData = () =>
    !loading &&
    response.map((item, index) => <PostCard key={index} props={item} />);

  return (
    <PostsList>
      {/* <TimelineData /> */}
      <SkeletonLoading />
    </PostsList>
  );
}

const PostsList = styled.ul`
  width: 100%;
  margin-right: 26px;
`;

const Post = styled.li`
  display: flex;
  width: 90%;
  justify-content: space-between;
  border-radius: 16px;
  background-color: #171717;
  padding: 18px;
  margin-bottom: 10px;
`;

const LikePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
  margin-right: 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const LikeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  p {
    margin-top: 6px;
    text-align: center;
    font-size: 10px;
  }
`;

const PostDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  h3 {
    height: 20px;
    width: 100%;
    font-size: 20px;
  }

  p {
    width: 100%;
    font-size: 18px;
    margin-top: 18px;
    color: #b7b7b7;
    font-weight: 300;
  }
`;

export default Posts;
