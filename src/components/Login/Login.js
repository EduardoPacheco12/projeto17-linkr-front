import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from  "react-loader-spinner";
import GlobalStyle from "../../assets/globalStyles";
import DataContext from "../../context/DataContext";

export default function Login() {
    //LOGIC
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {setToken} = useContext(DataContext);
    const navigate = useNavigate();

    function FinishLogin(e) {
        e.preventDefault();
        setLoading(true);
        const body = {
            email,
            password
        }
        const promise = axios.post("http://localhost:4000/", body);
        promise.then( async (response) => {
            setLoading(false);
            localStorage.setItem("token", response.data);
            setToken(response.data)
            navigate("/timeline");
        })
        promise.catch( (error) => {
            if(error.response.status === 401) {
                alert("Email or password is incorrect, please try again")
                setLoading(false);
                setEmail("");
                setPassword("");
            }
            if(error.response.status === 422) {
                alert("Please fill in all fields")
                setLoading(false);
            }
            if(error.response.status === 500) {
                alert("Server Error!!!")
                setLoading(false);
                setEmail("");
                setPassword("");
            }
        })
    }

    //UI
    return(
        <All>
            <GlobalStyle/>
            <Title>
                <h1>linkr</h1>
                <h3>save, share and discover the best links on the web</h3>
            </Title>
            <Content>
                <Forms onSubmit={FinishLogin}>
                    <input type="email" placeholder="e-mail" disabled={loading === true ? true : false} onChange={(e) => setEmail(e.target.value)} value={email} required/>
                    <input type="password" placeholder="password" max="20" disabled={loading === true ? true : false} onChange={(e) => setPassword(e.target.value)} value={password} required/>
                    <button type="submit" disabled={loading === true ? true : false}>
                        {loading === true ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Log In"}
                    </button>
                </Forms>
                <Click to="/sign-up">
                    <BackRegister>First time? Create an account!</BackRegister>
                </Click>
            </Content>
            
        </All>
        
    )
}

const All = styled.div `
    display: flex;
    @media(max-width: 1023px) {
        flex-direction: column;
    }
`

const Title = styled.div `
    height: 100vh;
    width: 60vw;
    background-color: #151515;
    display: flex;
    flex-direction: column;
    padding: 25vh 0 0 10vw;
    h1 {
        font-family: 'Passion One';
        font-weight: 700;
        font-size: 76px;
        line-height: 84px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
    h3 {
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 23px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
        max-width: 237px;
    }
    @media(max-width: 1023px) {
        height: 28vh;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
`;

const Content = styled.div `

`;

const Forms = styled.form `
    display: flex;
    flex-direction: column;
    margin-top: 27vh;
    padding: 0 5vw;
    input {
        width: 380px;
        height: 50px;
        margin-bottom: 14px;
        background: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 22px;
        line-height: 33px;
        color: #9F9F9F;
        padding-left: 15px;
        ::-webkit-input-placeholder {
            font-family: 'Oswald';
            font-weight: 700;
            font-size: 22px;
            line-height: 33px;
            color: #9F9F9F;
        }
    }
    button {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1777F2;
        border: 1px solid #1777F2; 
        border-radius: 5px;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #FFFFFF;
        &:hover {
            cursor: pointer;
        }
    }
    @media(max-width: 1023px) {
        margin-top: 40px;
        padding: 0 22px;
        input {
            width: 100%;
            height: 55px;
        }
        button {
            width: 100%;
            height: 46px;
        }
    }
`;

const BackRegister = styled.p `
    padding: 0 75px;
    font-family: 'Lato';
    text-align: center;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-decoration-line: underline;
    color: #FFFFFF;
`;

const Click = styled(Link) `
    text-decoration: none;
`;