import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from "react-router-dom";

export default function HashtagCard({ text }) {
  const navigate = useNavigate();

  return (
    <ReactHashtag
      onHashtagClick={(val) => navigate(`/hashtag/${val.replace("#", "")}`)}
    >
      { text }
    </ReactHashtag>
  );
}