import styled from "styled-components";
import { useAxios } from "../../hooks/useAxios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { useLoading } from "../../hooks/useLoading";

function Trends() {
  // const { response, error, loading } = useAxios({
  //   path: "test",
  //   method: "get",
  // });
  const [doneLoading, setDoneLoading] = useLoading(false);


  const Trending = () =>
  doneLoading ? (
      <li>
        <Skeleton width={"95%"} height={20} />
      </li>
    ) : (
      <li>
        <Skeleton width={"95%"} height={20} />
      </li>
    );

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#5A5A5A">
      <TrendBorder>
        <h3>trending</h3>
        <TopTrendsList>
          {/* <Trending /> */}
        </TopTrendsList>
      </TrendBorder>
    </SkeletonTheme>
  );
}

const TrendBorder = styled.div`
  display: flex;
  max-width: 300pxa;
  flex-grow: 1;
  flex-direction: column;
  background-color: #171717;
  color: #ffffff;
  border-radius: 16px;
  margin-left: 25px;
  box-sizing: border-box;
  margin-top: 80px;
  h3 {
    margin: 18px 0 14px 18px;
    font-size: 28px;
    font-weight: bold;
    font-family: "Oswald";
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const TopTrendsList = styled.ul`
  width: 100%;
  height: 100%;
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
