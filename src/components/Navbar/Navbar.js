import { useState, useEffect } from "react";
import styled from "styled-components";
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
        <SearchContainer>
          <input placeholder="Search for people"/>
          <GoSearch fontSize="30px" color="#C6C6C6" />
        </SearchContainer>
        <UserMenu>
          <AiOutlineDown fontSize="30px" color="#FFFFFF" />
          <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
        </UserMenu>
      </MenuContent>
    </MenuContainer>
  );
}

const MenuContainer = styled.nav`
  display: ${({ showNavbar }) => showNavbar ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: #151515;
  position: fixed;
  top: 0;
  left: 0;
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
`;

const BrandName = styled.h1`
  margin: 10px 28px;
  font-size: 50px;
  font-weight: bold;
  color: #FFFFFF;
  font-family: 'Passion One', cursive;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  margin: 14px 0;
  padding: 12px;
  background-color: #FFFFFF;
  border-radius: 8px;

  input {
    width: 92%;
    font-size: 20px;
    font-family: "Lato";
    border: none;
  }

  input:focus {
    outline: none;
  }

  input:-ms-input-placeholder {
    font-family: "Lato";
    color: #C6C6C6;
    background-color: #FFFFFF;
  }
  
  input::placeholder {
    font-family: "Lato";
    color: #C6C6C6;
    background-color: #FFFFFF;
  }
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