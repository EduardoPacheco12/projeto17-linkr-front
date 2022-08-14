import { useContext } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import ModalContext from "../../context/ModalContext";

export default function DeleteAlert() {
  const { showModal, setShowModal } = useContext(ModalContext);
  const customStyles= {
    content: {
      width: "30vw",
      height: "26vh",
      left: "37vw",
      right: "37vw",
      top: "40vh",
      bottom: "40vh",
      backgroundColor: "#333333",
      borderRadius: "25px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  }

  return(
    <ReactModal
    isOpen={showModal}
    style={customStyles}
    >
        <Text>Are you sure you want to delete this post?</Text>
        <Buttons>
          <GoBack onClick={() => {setShowModal(false)}}>No, go back</GoBack>
          <Delete>Yes, delete it</Delete>
        </Buttons>
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
  button {
    border-radius: 5px;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
  }
`;

const GoBack = styled.button `
  margin-right: 7px;
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  color: #1877F2;
`;

const Delete = styled.button `
  margin-left: 7px;
  background-color: #1877F2;
  border: 1px solid #1877F2;
  color: #FFFFFF;
`