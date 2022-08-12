import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchUser from "./SearchUser";
import LogoutButton from "./LogoutButton";
import { GoSearch } from "react-icons/go";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useLocalstorage } from "../../hooks/useLocalstorage";

function Navbar() {
  const [ showNavbar, setShowNavbar ] = useState(false);
  const[logout, setLogout] = useState(false);
  const location = useLocation();
  const { pictureUrl } = useLocalstorage({ key: "linkrToken" });

  useEffect(() => {
    if(location.pathname === "/" || location.pathname === "/sign-up") {
      setShowNavbar(false)
    } else {
      setShowNavbar(true)
    }
  }, [location.pathname]);

  function showLogout() {
    setLogout(!logout); 
  }

  return (
    <MenuContainer showNavbar={ showNavbar }>
      <MenuContent>
        <BrandName>linkr</BrandName>
        <SearchUser />
        <UserMenu onClick={showLogout}>
          {logout === false ? <AiOutlineDown fontSize="30px" color="#FFFFFF" /> : <AiOutlineUp fontSize="30px" color="#FFFFFF" />}
          <img src={pictureUrl} alt="foca" />
        </UserMenu>
        {logout === false ? <></> : <LogoutButton/>}
      </MenuContent>
    </MenuContainer>
  );
}

const MenuContainer = styled.nav`
  display: ${({ showNavbar }) => showNavbar ? "flex" : "none"};
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 82px;
  background-color: #151515;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index:1;
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  height: 82px;
  position: relative;
`;

const BrandName = styled.h1`
  margin: 10px 28px;
  font-size: 50px;
  font-weight: bold;
  color: #FFFFFF;
  font-family: 'Passion One', cursive;
`;

const UserMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 18px;

  img {
    width: 54px;
    height: 54px;
    margin-left: 12px;
    border-radius: 50%;
  }
`;

export default Navbar;