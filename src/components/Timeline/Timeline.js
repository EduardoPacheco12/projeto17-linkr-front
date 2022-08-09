import styled from "styled-components";
import Post from "./Post";
import Publish from "./Publish";

function Timeline() {
  return (
    <Container>
      <Content>
        <h4>timeline</h4>
        <Publish />
        <Post/>
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