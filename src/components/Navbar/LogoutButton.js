import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutContext from "../../context/LogoutContext";

function LogoutButton() {
    const navigate = useNavigate();
    const { setLogout } = useContext(LogoutContext);

    function returnLoginScreen() {
        localStorage.removeItem("linkrToken");
        navigate("/");
        setLogout(false);
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
    border-radius: 0px 0px 0px 20px;
    z-index:1;
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
`;

export default LogoutButton;