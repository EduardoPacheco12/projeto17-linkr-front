import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000"
});


export const getLikes = async (postId) => {
    const likes = await api.get(`/likes/${postId}`);
    return likes;
}
  
export const addOrRemoveLike = async (postId, token) => {

    const toogleLike = await api.post(`/likes/${postId}`,{}, {headers:{Authorization: `Bearer ${token}`}  });
    return toogleLike;
}