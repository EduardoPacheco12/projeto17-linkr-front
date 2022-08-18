import styled from "styled-components";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { TbSend } from "react-icons/tb";


function Comment(props) {
    return(
        <UserComment>
            <User>
                <img src="https://i.pinimg.com/736x/25/78/61/25786134576ce0344893b33a051160b1.jpg" alt="" />
                <Info>
                    <UserInfo>
                        <Name>João Avatares</Name>
                        <Identification>• post's author</Identification>
                    </UserInfo>
                    <Message>Adorei esse post, ajuda muito a usar Material UI com React!Adorei esse post, ajuda muito a usar Material UI com React!Adorei esse post, ajuda muito a usar Material UI com React!Adorei esse post, ajuda muito a usar Material UI com React!</Message>
                </Info>
            </User>
            <span></span>
        </UserComment>
    );
}

export default function Comments(props) {
    const { showComments } = props;
    const { pictureUrl } = useLocalstorage( {key: "linkrToken"} );
    return(
        <>
            {
                showComments === true 
                ?
                <CommentsContainer>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <UserText>
                        <img src={pictureUrl} alt="" />
                        <input type="text" placeholder="write a comment..."/>
                        <Send color="#ffffff" />
                    </UserText>
                </CommentsContainer> 
                :
                <Empty></Empty>
            }
        </>  
    );
}

const Empty = styled.div `
    margin-bottom: 10px;
`

const CommentsContainer = styled.div `
    border-radius: 0 0 16px 16px;
    background-color: #1e1e1e;
    margin-top: -10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
`

const UserText = styled.div `
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    position: relative;
    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 15px;
    }
    input {
        width: 510px;
        height: 35px;
        background-color: #252525;
        border-radius: 8px;
        border: none;
        padding-left: 15px;
        padding-right: 35px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 12px;
        line-height: 35px;
        color: #FFFFFF;
        ::-webkit-input-placeholder {
            font-family: 'Lato';
            font-style: italic;
            font-weight: 400;
            font-size: 12px;
            line-height: 35px;
            letter-spacing: 0.05em;
            color: #575757;
        }
    }
`;

const Send = styled(TbSend) `
    position: absolute;
    right: 35px;
    cursor: pointer;
`;

const UserComment = styled.li `
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
        margin-left: 25px;
        margin-bottom: 15px;
    }
    span {
        height: 1px;
        width: 560px;
        background-color: #353535;
        margin-left: 25px;
    }
`;

const User = styled.div `

`;

const UserInfo = styled.div `
    margin-bottom: 3px;
`;

const Info = styled.div `
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    margin-bottom: 10px;
`;

const Name = styled.p `
    font-family: 'Lato';
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #F3F3F3;
    margin-right: 4px;
`;

const Identification = styled.p `
    font-family: 'Lato';
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #565656;
`;

const Message = styled.p `
    font-family: 'Lato';
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #ACACAC;
`;