import axios from 'axios';
import { getAuthHeader } from './authHeader';

export const getAllPosts = async () => {
    try {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/post");

        return res.data;
    } catch(err) {
        console.error(err);
    }
}

export const createPost = (params) => {
    axios.post(process.env.REACT_APP_API_URL + "/post", params, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    })
}
