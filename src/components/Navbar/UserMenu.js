import styled from "styled-components";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function UserMenu() {
    return (
        <Menu>
          <AiOutlineDown fontSize="30px" color="#FFFFFF" />
          <img src="https://cdn.pixabay.com/photo/2017/01/01/22/04/crawl-1945633_960_720.jpg" alt="foca" />
        </Menu>
    );
}

const Menu = styled.div`
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

export default UserMenu;