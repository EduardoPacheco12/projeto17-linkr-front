import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";

function Posts() {
  return (
    <PostsList>
      <Post>
        <LikePictureContainer>
          <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
          <LikeContainer>
            <FaRegHeart color="#FFFFFF" fontSize={"20px"} />
            <p>{ `${ 400 } likes` }</p>
          </LikeContainer>
        </LikePictureContainer>
        <PostDataContainer>
          <h3>{ "almost clieton" }</h3>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
            Pellentesque habitant morbi tristique senectus et netus et malesuada 
          </p>
        </PostDataContainer>
      </Post>
    </PostsList>
  );
}

const PostsList = styled.ul`
  width: 100%;
  margin-right: 26px;
`;

const Post = styled.li`
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  background-color: #171717;
  padding: 18px;
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
    font-size: 20px;
  }

  p {
    font-size: 18px;
    margin-top: 18px;
    color: #B7B7B7;
    font-weight: 300;
  }
`;

export default Posts;