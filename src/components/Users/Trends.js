import styled from "styled-components";
import { useAxios } from "../../hooks/useAxios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Trends() {
  const { response, error, loading } = useAxios({
    path: "test",
    method: "get",
  });

  const Trending = () =>
    loading ? (
      <li>
        <Skeleton width={"100%"} height={20} />
      </li>
    ) : (
      <li>
        <Skeleton width={"100%"} height={20} />
      </li>
    );

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#5A5A5A">
      <TrendBorder>
        <h3>trending</h3>
        <TopTrendsList>
          <Trending />
        </TopTrendsList>
      </TrendBorder>
    </SkeletonTheme>
  );
}

const TrendBorder = styled.div`
  width: 44%;
  background-color: #171717;
  color: #ffffff;
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
  border-top: solid 1px #ffffff;

  li {
    margin: 10px 0 0 18px;
    font-size: 20px;
    font-family: "Lato";
    font-weight: bold;
  }
`;

export default Trends;
