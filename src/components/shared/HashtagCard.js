import ReactHashtag from "@mdnm/react-hashtag";
import styled from "styled-components";
import { useState } from "react";

export default function HashtagCard(props) {
  const { text } = props;

  return (
    <ReactHashtag
      renderHashtag={(hashtagValue) => <Hashtag>{hashtagValue}</Hashtag>}
    >
      {text}
    </ReactHashtag>
  );
}

const Hashtag = styled.span`
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;
