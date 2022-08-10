import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { GoSearch } from "react-icons/go";
import SearchedUsers from "./SearchedUsers";

function SearchUser() {
  const [ usersSearched, setUsersSearched ] = useState([]);

  async function searchApi(e) {
    const MIN_CARACTERS_TO_SEARCH = 3;

    if(e.target.value.length >= MIN_CARACTERS_TO_SEARCH) {
      try {
        const searchData = await axios.get(`http://localhost:3333/users/?name=${ e.target.value }`);
        setUsersSearched(searchData.data);
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <SearchContainer>
      <SearchBar>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          placeholder="Search for people"
          onChange={ searchApi }
        />
        <GoSearch fontSize="30px" color="#C6C6C6" />
      </SearchBar>
      {
        usersSearched.length !== 0
        ?
        <SearchedUsers usersSearched={ usersSearched } />
        :
        <></>
      }
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 14px;
  padding: 0 24px 0 0;
  background-color: #E7E7E7;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

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

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #FFFFFF;
  padding: 12px;
  border-radius: 8px;
`;

export default SearchUser;