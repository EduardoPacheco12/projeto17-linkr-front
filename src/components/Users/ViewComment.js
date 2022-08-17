import styled from "styled-components";
import { BsChatDots } from "react-icons/bs";


export default function ViewComment() {
    return (
        <Chat>
            <BsChatDots color={"while"} fontSize={"20px"} cursor={"pointer"}/>
            <p>0 comments</p>
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