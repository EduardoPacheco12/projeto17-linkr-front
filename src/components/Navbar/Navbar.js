import { useState, useEffect } from "react";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import SearchUser from "./SearchUser";
import { GoSearch } from "react-icons/go";
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
        <UserMenu />
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

export default Navbar;