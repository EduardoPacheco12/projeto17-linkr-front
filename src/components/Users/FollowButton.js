import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAxios } from "../../hooks/useAxios";
import { useLocalstorage } from "../../hooks/useLocalstorage";

function FollowButton ({ searchedUserId }) {
  const { token } = useLocalstorage({ key: "linkrToken" });
  const [ relationId, setRelationId ] = useState(null);
  const [ config, setConfig ] = useState({});
  const { response, error, loading } = useAxios(config);

  useEffect(() => {
    if(!config.path?.includes(searchedUserId)) {
      const path = `follow/${searchedUserId}`;

      const header = {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      }

      setConfig({ path, method:"get", config: [ header ]});
    }
    
    if(response !== null && !loading) {
      setRelationId(response.data.relationId);
    }

    if(error !== null && !loading) {
      alert("Não foi possível realizar a operação")
    } 
  }, [ response, error, loading, searchedUserId ]);

  function followUnfollow() {
    console.log("enviou")
    const path = `follow/${searchedUserId}`;

    const header = {
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }

    setConfig({ path, method:"post", config: [ {}, header ]});
  }

  return (
    <FollowUnfollowButton
      disabled={ loading }
      isFollowing={ relationId }
      onClick={ followUnfollow }
    >
      { relationId ? "Unfollow" : "Follow" }
    </FollowUnfollowButton>
  )
};

const FollowUnfollowButton = styled.button`
  place-self: center;
  margin: 30px 20px 0 20px;
  padding: ${({ isFollowing }) => isFollowing ? "8px 28px" : "8px 36px"};
  border-radius: 6px;
  border: none;
  font-family: "Lato";
  font-weight: bold;
  font-size: 16px;
  color: ${({ isFollowing }) => isFollowing ? "#1877F2" : "#FFFFFF"};
  background-color: ${({ isFollowing }) => isFollowing ? "#FFFFFF": "#1877F2"};
`;

export default FollowButton;