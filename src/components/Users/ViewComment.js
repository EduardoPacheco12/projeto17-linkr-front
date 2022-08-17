import styled from "styled-components";
import { BsChatDots } from "react-icons/bs";


export default function ViewComment(props) {
    const { comments, setShowComments, showComments } = props;
    return (
        <Chat>
            <BsChatDots color={"while"} fontSize={"20px"} cursor={"pointer"} onClick={() => {setShowComments(!showComments)}}/>
            <p>{`${comments} ${comments=== 1 ? "comment" : "comments"}`}</p>
        </Chat>
        
    )
}

const Chat = styled.div `
    margin-top: 15px;
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