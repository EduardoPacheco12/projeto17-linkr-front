import styled from "styled-components";
import Posts from "./Posts";
import Trends from "./Trends";

function UsersView() {
  return (
    <MainContainer>
      <MainContent>
        <UserDataContainer>
          <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
          <h2>{ `${"almost cleiton"}'s posts` }</h2>
        </UserDataContainer>
        <PostTrendContainer>
          <Posts />
          <Trends />
        </PostTrendContainer>
      </MainContent>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  color: #FFFFFF;
  background-color: #333333;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
<<<<<<< HEAD
  width: 950px;
=======
  width: 900px;
  margin: 84px;
>>>>>>> ccd0fdfa70029b734d149346664767ee206f6c21
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

export const PostTrendContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 40px
`;

export default UsersView;