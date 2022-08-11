import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchUser from "./SearchUser";
import { GoSearch } from "react-icons/go";
import { AiOutlineDown } from "react-icons/ai";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [ showNavbar, setShowNavbar ] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/" || location.pathname === "/sign-up") {
      setShowNavbar(false)
    } else {
      setShowNavbar(true)
    }
  }, [location.pathname]);

  return (
    <MenuContainer showNavbar={ showNavbar }>
      <MenuContent>
        <BrandName>linkr</BrandName>
        <SearchUser />
        <UserMenu>
          <AiOutlineDown color="#FFFFFF" />
          <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
        </UserMenu>
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
  z-index: 1;
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