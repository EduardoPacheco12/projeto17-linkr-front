import ReactHashtag from "@mdnm/react-hashtag";
import styled from "styled-components";

export default function HashtagCard(props) {
  const { text } = props;

  return (
    <ReactHashtag
      renderHashtag={(hashtagValue, index) => <Hashtag key={index} >{hashtagValue}</Hashtag>}
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
