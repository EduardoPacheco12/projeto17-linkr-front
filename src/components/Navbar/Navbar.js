import styled from "styled-components";
import SearchUser from "./SearchUser";
import LogoutButton from "./LogoutButton";
import DataContext from "../../context/DataContext";
import { useState, useContext, useEffect } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const { logout, setLogout, userData } = useContext(DataContext);
  const [showNavbar, setShowNavbar] = useState((pathname === "/" || pathname === "/sign-up") ? false : true);

  useEffect(() => {
    setShowNavbar((pathname === "/" || pathname === "/sign-up") ? false : true)
  }, [pathname, userData]);

  function showLogout() {
    setLogout(!logout); 
  }

  return (
  <>
    <MenuContainer showNavbar={ showNavbar }>
      <MenuContent>
        <BrandName>linkr</BrandName>
        <UserMenu onClick={showLogout}>
          { !logout ? <AiOutlineDown fontSize="30px" color="#FFFFFF" /> : <AiOutlineUp fontSize="30px" color="#FFFFFF" />}
          <img src={userData?.pictureUrl} alt="foca" />
        </UserMenu>
        { !logout ? <></> : <LogoutButton/> }
      </MenuContent>
    </MenuContainer>
    <SearchUser />
  </>
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
  z-index: 1;

  @media screen and (max-width: 900px) {
   z-index: 2;
  }
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  height: 82px;
`;

const BrandName = styled.h1`
  margin: 10px 28px;
  font-size: 50px;
  font-weight: bold;
  color: #FFFFFF;
  font-family: 'Passion One', cursive;

  @media screen and (max-width: 600px) {
    font-size: 46px;
  }
`;

const UserMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 18px;
  font-size: 30px;
  
  img {
    width: 54px;
    height: 54px;
    margin-left: 12px;
    border-radius: 50%;
  }

  @media screen and (max-width: 600px){
    font-size: 26px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export default Navbar;