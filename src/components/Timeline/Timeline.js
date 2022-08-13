import styled from "styled-components";
import Publish from "./Publish";
import Trends from "../Users/Trends";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PostTrendContainer } from "../Users/UsersView";
import Posts from "../Users/Posts";
import LogoutContext from "../../context/LogoutContext";

function Timeline() {
  const { pathname } = useLocation();
  const [isTimeline, setIsTimeline] = useState(true);
  const { setLogout } = useContext(LogoutContext);

  useEffect(() => {
    setIsTimeline(pathname === "/timeline" ? true : false);
    console.log(isTimeline);
    console.log(pathname);
  }, [isTimeline]);

  const Title = () =>
    isTimeline ? (
      <h4>timeline</h4>
  ) : (
      <h4>{pathname.replace("/hashtag/", "# ")}</h4>
  );

  const PublishBox = () =>
    isTimeline ? (
      <>
        <PublishPosts>
          <Publish />
          <Posts path={"timeline"} method={"get"} />
        </PublishPosts>
      </>
<<<<<<< HEAD
  ) : (
      <>
        <PublishPosts>
          <PageContent />
        </PublishPosts>
      </>
  );

  const PageContent = () => (
    <TrendsPosts>
      <Posts path={pathname.replace("/","")} method={"get"} />
    </TrendsPosts>
  );

=======
    ) : (
      <>
        <Title />
        <PostTrendContainer>
          <PublishPosts>
          <PageContent />
          </PublishPosts>
          <Trends />
        </PostTrendContainer>
      </>
    );
    
>>>>>>> 43047c5c726a4919a499da36cc54b1d760a1e472
  function hideLogout() {
    setLogout(false);
  }

  return (
    <Container>
      <Content onClick={hideLogout}>
        <Title />
        <PostTrendContainer>
          <PublishBox />
          <Trends />
        </PostTrendContainer>
      </Content>
    </Container>
  );
}

export default Timeline;

const Container = styled.div`
  display: flex;
  padding-top: 78px;
  margin-top: 72px;
  width: 100%;
  background-color: #333333;
  min-height: calc(100vh - 72px);
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 950px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h4 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 43px;
    color: white;
  }

  @media screen and (max-width: 950px) {
    width: 100%;
  }
`;

const PublishPosts = styled.div`
  div {
    display: flex;
  }
`;

const TrendsPosts = styled(PostTrendContainer)`
  flex-direction: column;
  max-width: 611px;
  margin-top: 0px;
`;
