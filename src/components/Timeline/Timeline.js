import styled from "styled-components";
import Post from "./Post";
import Publish from "./Publish";
import { useToggle } from "../../hooks/useToggle";
import { useAxios } from "../../hooks/useAxios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Posts from "../Users/Posts";

function Timeline() {
  const location = useLocation();
  const [isTimeline, setIsTimeline] = useState(location.pathname === '/timeline' ? true : false);
  const { response, error, loading } = useAxios({ path: 'test', method: 'get' });

  const Title = () => isTimeline ? <h4>timeline</h4> : <h4>{location.pathname.replace("/hashtag/","# ")}</h4>
  const PublishBox = () => isTimeline ? <Publish /> : <></>;

  return (
    <Container>
      <Content>
        <Title />
        <PublishBox />
        <Posts />
      </Content>
    </Container>
  );
}

export default Timeline;

const Container = styled.div`
  padding-top: 78px;
  margin-top: 72px;
  display: flex;
  width: 100%;
  background-color: #333333;
  height: calc(100vh - 72px);
  align-items: center;
  flex-direction: column;

  
`;

const Content = styled.div`

    h4 {
        margin-bottom: 40px;
        font-family: "Oswald";
        font-weight: 700;
        font-size: 43px;
        color: white;
    }
`;