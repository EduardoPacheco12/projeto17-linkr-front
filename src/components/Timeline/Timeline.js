import styled from "styled-components";
import Publish from "./Publish";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Posts, { SkeletonLoading } from "../Users/Posts";
import { PostTrendContainer } from "../Users/UsersView";
import Trends from "../Users/Trends";
import DataContext from "../../context/DataContext";

function Timeline() {
  const { doneLoading } = useContext(DataContext);
  const location = useLocation();
  const [isTimeline, setIsTimeline] = useState(true);

  useEffect(() => setIsTimeline(location.pathname === "/timeline" ? true : false), []);

  const Title = () =>
  isTimeline ? (
    <h4>timeline</h4>
  ) : (
    <h4>{location.pathname.replace("/hashtag/", "# ")}</h4>
  );

  const PageContent = () => doneLoading ? <TrendsPosts ><Posts /></TrendsPosts> : <SkeletonLoading />;
  
  const PublishBox = () =>
  isTimeline ? (
    <>
      <PostTrendContainer>
        <Publish />
        <Trends />
      </PostTrendContainer>
      <Posts />
    </>
  ) : (
    <PostTrendContainer>
      <PageContent />
      <Trends />
    </PostTrendContainer>
  );

  return (
    <Container>
      <Content >
        <Title />
        <PublishBox />
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
    margin-bottom: 40px;
    font-family: "Oswald";
    font-weight: 700;
    font-size: 43px;
    color: white;
  }
`;

const TrendsPosts = styled(PostTrendContainer)`
  flex-direction: column;
  max-width: 611px;
  margin-top: 0px;
`