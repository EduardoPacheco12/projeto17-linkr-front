import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Posts from "./Posts";
import Trends from "./Trends";
import SearchedUserContext from "../../context/SearchedUserContext";
import LogoutContext from "../../context/LogoutContext";

function UsersView() {
  const { id } = useParams();
  const { searchedUser, userId, setUserId } = useContext(SearchedUserContext);
  const { setLogout } = useContext(LogoutContext);

  useEffect(() => {
    if(userId !== id) {
      setUserId(id);
    }
  }, [userId])


  function hideLogout() {
    setLogout(false);
  }

  return (
    <MainContainer onClick={hideLogout}>
      <MainContent>
        <UserDataContainer>
          <img
            src={ searchedUser.pictureUrl ? searchedUser.pictureUrl : "" }
            alt={ searchedUser.username ? searchedUser.username : "" }
          />
          <h2>
            {
              searchedUser.username
              ?
              `${ searchedUser.username }'s posts`
              :
              "Carregando"
            }
          </h2>
        </UserDataContainer>
        <PostTrendContainer>
          <Posts path={ `posts/${ id }` } method={ "get" } />
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
  width: 900px;
  margin: 84px;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 144px 0 40px 0 ;
  }
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

  @media screen and (max-width: 900px) {
    margin: 20px 0 0 10px;

    h2 {
      font-size: 34px;
    }
  }
`;

export const PostTrendContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 40px;
`;

export default UsersView;