import styled from "styled-components";
import GlobalStyle from "../../assets/globalStyles";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { useAxios } from "../../hooks/useAxios";

export default function Login() {
  //LOGIC
  const navigate = useNavigate();
  const [config, setConfig] = useState({ method: "", path: "", config: null });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');
  const localData = useLocalstorage({ key: 'linkrToken', value: token })
  const { response, loading, error } = useAxios(config);

  useEffect(() => {
    handleError();
    if(response !== null && !loading) {
      setToken(response.data);
    }
    if(localData?.length !== 0) {
      navigate('/timeline');
    }
  // eslint-disable-next-line
  } , [response, loading, localData]);

  function handleError() {
    if (!loading) {
      if (error?.response.status) {
        const status = error?.response.status;
        switch (status) {
          case 401:
            alert("Email or password is incorrect, please try again");
            setEmail("");
            setPassword("");
            break;
          case 422:
            alert("Please fill in all fields");
            break;
          case 500:
            alert("Server Error!!!");
            setEmail("");
            setPassword("");
            break;
          default:
            break;
        }
      }
    }
  }

  function FinishLogin(e) {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    setConfig({ path: "", method: "post", config: body });
  }

  //UI
  return (
    <All>
      <GlobalStyle />
      <Title>
        <h1>linkr</h1>
        <h3>save, share and discover the best links on the web</h3>
      </Title>
      <Content>
        <Forms onSubmit={FinishLogin}>
          <input
            type="email"
            placeholder="e-mail"
            disabled={loading === true ? true : false}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="password"
            max="20"
            disabled={loading === true ? true : false}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button type="submit" disabled={loading === true ? true : false}>
            {loading === true ? (
              <ThreeDots color="#FFFFFF" height={80} width={80} />
            ) : (
              "Log In"
            )}
          </button>
        </Forms>
        <Click to="/sign-up">
          <BackRegister>First time? Create an account!</BackRegister>
        </Click>
      </Content>
    </All>
  );
}

const All = styled.div`
  display: flex;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  height: 100vh;
  width: 60vw;
  background-color: #151515;
  display: flex;
  flex-direction: column;
  padding: 25vh 0 0 10vw;
  h1 {
    font-family: "Passion One";
    font-weight: 700;
    font-size: 76px;
    line-height: 84px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
  h3 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 23px;
    line-height: 34px;
    text-align: center;
    color: #ffffff;
    max-width: 237px;
  }
  @media (max-width: 1023px) {
    height: 28vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const Content = styled.div``;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 27vh;
  padding: 0 5vw;
  input {
    width: 380px;
    height: 50px;
    margin-bottom: 14px;
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 5px;
    font-family: "Oswald";
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    color: #9f9f9f;
    padding-left: 15px;
    ::-webkit-input-placeholder {
      font-family: "Oswald";
      font-weight: 700;
      font-size: 22px;
      line-height: 33px;
      color: #9f9f9f;
    }
  }
  button {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1777f2;
    border: 1px solid #1777f2;
    border-radius: 5px;
    font-family: "Oswald";
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  @media (max-width: 1023px) {
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

const BackRegister = styled.p`
  padding: 0 75px;
  font-family: "Lato";
  text-align: center;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-decoration-line: underline;
  color: #ffffff;
`;

const Click = styled(Link)`
  text-decoration: none;
`;
