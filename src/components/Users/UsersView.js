import styled from "styled-components";
import Posts from "./Posts";
import Trends from "./Trends";

function UsersView() {
  return (
    <MainContainer>
      <UserDataContainer>
        <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
        <h2>{ `${"almost cleiton"}'s posts` }</h2>
      </UserDataContainer>
      <PostTrendContainer>
        <Posts />
        <Trends />
      </PostTrendContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100vw;
  min-height: 100vh;
  padding: 0 240px;
  font-family: 'Lato', sans-serif;
  color: #FFFFFF;
  background-color: #333333;
  box-sizing: border-box;
`;

const UserDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0 0 20px;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 18px;
  }
  
  h2 {
    font-family: 'Oswald', sans-serif;;
    font-size: 44px;
    font-weight: bold;
  }
`;

const PostTrendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 40px
`;

export default UsersView;