import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URI
});


export const getRepost = async (postId, token) => {
    const repost = await api.get(`/repost/${postId}`, { headers: { Authorization: `Bearer ${token}` } }, {});
    return repost;
}
  
export const rePoster = async (postId, token) => {
    const reposter = await api.post(`/repost/${postId}`,{}, {headers:{Authorization: `Bearer ${token}`}  });
    return reposter.status;
}