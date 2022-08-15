import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DataContext from "../../context/DataContext";

function LogoutButton() {
    const navigate = useNavigate();
    const { setLogout } = useContext(DataContext);

    function returnLoginScreen() {
        localStorage.removeItem("linkrToken");
        setLogout(false);
        navigate("/");
    }

    return (
        <Box onClick={returnLoginScreen}>
            <p>Logout</p>
        </Box>
    )
}

const Box = styled.div `
    position: absolute;
    height: 47px;
    width: 130px;
    right: 0;
    bottom: -47px;
    display: flex;
    background-color: #171717;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 20px 20px;
    z-index:2;

    p {
        font-family: 'Lato';
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
    &:hover {
      cursor: pointer;
    }

    @media screen and (max-width: 900px){
      border-radius: 0px 0px 0px 20px;
    }
`;

export default LogoutButton;