import styled from "styled-components";
import Publish from "./Publish";
import { useToggle } from "../../hooks/useToggle";
import { useAxios } from "../../hooks/useAxios";

function Timeline() {
  const { response, error } = useAxios({ path: 'test', method: 'get' });
  console.log(response);
  // console.log(useAxios({ path: 'test', method: 'get' }));

  function Button() {
    // Call the hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();
    
    return (
        <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
    );
  }

  return (
    <Container>
      <Content>
        <h4>timeline</h4>
        <Publish />
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