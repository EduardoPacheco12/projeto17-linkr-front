import styled from "styled-components";

function Trends() {
  return (
    <TrendBorder>
      <h3>trending</h3>
      <TopTrendsList>
        <li># javascript</li>
        <li># javascript</li>
      </TopTrendsList>
    </TrendBorder>
  )
}

const TrendBorder = styled.div`
  width: 44%;
  background-color: #171717;
  border-radius: 16px;
  
  h3 {
    margin: 18px 0 14px 18px;
    font-size: 28px;
    font-weight: bold;
    font-family: "Oswald";
  }
`;

const TopTrendsList = styled.ul`
  width: 100%;
  padding: 10px 0 20px 0;
  border-top: solid 1px #FFFFFF;

  li {
    margin: 10px 0 0 18px;
    font-size: 20px;
    font-family: "Lato";
    font-weight: bold;
  }
`;

export default Trends;