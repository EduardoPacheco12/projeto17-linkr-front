import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SearchedUsers({ usersSearched, setSearchInput }) {
  const navigate = useNavigate();

  function selectUser(id) {
    setSearchInput("");
    navigate(`/users/${id}`);
  }

  return (
    <UsersList>
      {
        usersSearched.map((user, index) => {
          return (
            <UserIndentification
              key={ index }
              onClick={ () => selectUser(user.id)}>
              <img  src={ user.pictureUrl } alt={ user.username } />
              <h3>{ user.username }</h3>
            </UserIndentification>
          );
        })
      }
    </UsersList>
  );
}

const UsersList = styled.ul`
  width: 100%;
  padding: 0 12px;
`;

const UserIndentification = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 0;

  img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border-radius: 50%;
  }

  h3 {
    font-size: 20px;
    color: #515151;
  }
`;

export default SearchedUsers;