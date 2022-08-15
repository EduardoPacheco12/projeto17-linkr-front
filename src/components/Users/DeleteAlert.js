import { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import ModalContext from "../../context/ModalContext";
import { useLocalstorage } from "../../hooks/useLocalstorage";
import { useAxios } from "../../hooks/useAxios";
import { TailSpin } from "react-loader-spinner";
import PostContext from "../../context/PostContext";


export default function DeleteAlert() {
  const customStyles= {
    content: {
      maxWidth: "600px",
      maxHeight: "264px",
      margin: "auto",
      backgroundColor: "#333333",
      borderRadius: "25px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    overlay: {
      display: "flex",
      alignItems: "center",
      zIndex: 4,
    }
  }
  const { showModal, setShowModal } = useContext(ModalContext);
  const { postId } = useContext(PostContext);
  const [ modalLoading, setModalLoading] = useState(false);
  const { token } = useLocalstorage({ key: "linkrToken" });
  const { setNewPost } = useContext(PostContext); 
  const [config, setConfig] = useState({
    method: "",
    path: "",
    config: [{ headers: { Authorization: `Bearer ${token}` } }, null],
  });
  const { response, loading, error } = useAxios(config);
  useEffect(() => {
    if(response !== null) {
      setModalLoading(false);
      setShowModal(false);
      setNewPost(true);
    }
    if(error !== null) {
      alert("Your post cannot be deleted, please try again");
      setModalLoading(false);
      setShowModal(false);

    }
  }, [response, error]);
  

  function deletePost() {
    setModalLoading(true);
    setConfig({ 
      path: `posts/${postId}`, 
      method: "delete", 
      config: [{ headers: { Authorization: `Bearer ${token}` } }, null] 
    });
  }

  return(
    <ReactModal
    isOpen={showModal}
    style={customStyles}
    ariaHideApp={false}
    >
      {modalLoading === true ? 
      <TailSpin color="#FFFFFF" height={80} width={80} />
      : 
      <>
        <Text>Are you sure you want to delete this post?</Text>
        <Buttons>
          <GoBack onClick={() => {setShowModal(false)}}>No, go back</GoBack>
          <Delete onClick={deletePost}>Yes, delete it</Delete>
        </Buttons>
      </>
      }  
    </ReactModal>
  )
}

const Text = styled.p `
  text-align: center;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #FFFFFF;
  margin-bottom: 25px;
`

const Buttons = styled.div `
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;

  button {
    margin: 10px;
    width: 134px;
    border-radius: 5px;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
  }
`;

const GoBack = styled.button `
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  color: #1877F2;
`;

const Delete = styled.button `
  background-color: #1877F2;
  border: 1px solid #1877F2;
  color: #FFFFFF;
`