import styled from "styled-components";
import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { useAxios } from "../../hooks/useAxios";

export default function ViewComment(props) {
  const { comments, setShowComments, showComments, id, setDataComments } = props;
  const { token } = useLocalstorage( {key: "linkrToken"} );
  const [config, setConfig] = useState({
      method: "",
      path: "",
      config: [{ headers: { Authorization: `Bearer ${token}` } }, null],
    });
  const { response, loading, error } = useAxios(config);

  useEffect(() => {
    if(response !== null) {
      setDataComments(response.data);
    }
    if(error !== null) {
      alert("Unable to access comments for this post, please try again");
      setShowComments(false);
    }
  }, [response, error]);

  useEffect(() => {
    if(showComments === true) {
      setConfig({
        method: "get",
        path: `comments/${id}`,
        config: [{ headers: { Authorization: `Bearer ${token}` } }, null],
      })
    }
  }, [showComments])

  function openComments() {
    setShowComments(!showComments);
  }

  return (
    <Chat>
        <BsChatDots color={"while"} fontSize={"20px"} cursor={"pointer"} onClick={openComments}/>
        <p>{`${comments} ${comments == 1 ? "comment" : "comments"}`}</p>
    </Chat>
  )
}

const Chat = styled.div `
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 9px;
    line-height: 13px;
    text-align: center;
    margin-top: 4px;
    color: #FFFFFF;
  }
`;