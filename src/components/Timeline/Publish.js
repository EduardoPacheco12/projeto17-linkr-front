import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import PostContext from "../../context/PostContext";

function Publish() {
  const [config, setConfig] = useState({ method: "", path: "", config: null });
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const { setNewPost } = useContext(PostContext);
  const { token, pictureUrl, username } = useLocalstorage({ key: "linkrToken" });
  const { response, loading, error } = useAxios(config);
  const navigate = useNavigate();

  useEffect(() => {
    handleError();
    if (!token) {
      navigate("/");
    }

    if (response !== null) {
      setLink("");
      setDescription("");
      setNewPost(response.data);
    }
  }, [response, loading, token]);

  function handleError() {
    if (!loading) {
      if (error?.response.status) {
        const status = error?.response.status;
        switch (status) {
          case 401:
            alert("Session expired, please try again");
            // limpa o local storage e desloga
            break;
          case 422:
            alert("Please fill in all fields");
            break;
          case 500:
            alert("Server Error!!!");
            break;
          default:
            break;
        }
      }
    }
  }

  function submit(event) {
    event.preventDefault();
    const body = {
      link,
      description,
    };
    const config = [
      body,
      { headers: { Authorization: `Bearer ${token}` } } ,
    ];

    setConfig({ path: "publish", method: "post", config: config });
  }

  return (
    <Container>
      <img src={pictureUrl} alt={ username } />
      <Form onSubmit={(e) => submit(e)}>
        <h3>What are you going to share today?</h3>
        <input
          required
          disabled={loading}
          name="link"
          placeholder="http://..."
          onChange={(e) => {
            setLink(e.target.value);
          }}
          value={link}
        />
        <textarea
          name="description"
          disabled={loading}
          placeholder="Awesome article about #javascript"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <input
          type="submit"
          value={loading ? "Publishing..." : "Publish"}
          disabled={loading}
        />
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 612px;
  height: 209px;
  padding: 16px 20px;
  display: flex;
  gap: 18px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  box-sizing: border-box;
  margin-bottom: 29px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  align-items: end;

  h3 {
    margin-top: 5px;
    width: 100%;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
  }
  input,
  textarea {
    background: #efefef;
    border-radius: 5px;
    border: none;
    padding: 8px 12px;
    width: 100%;
    box-sizing: border-box;
  }
  input:disabled,
  textarea:disabled {
    border: 1px solid #a84e32;
  }

  input {
    height: 30px;
  }

  input[type="submit"] {
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }

  input[type="submit"]:disabled {
    background-color: gray;
    border: none;
  }
  textarea {
    height: 66px;
  }
`;

export default Publish;
