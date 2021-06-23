import axios from 'axios';
import { getAuthHeader } from './authHeader';

export const getCommentsByPostId = async (post_id) => {
    try {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/comment/" + post_id);

        return res.data;
    } catch(err) {
        console.error(err);
    }
}

export const createComment = (params) => {
    axios.post(process.env.REACT_APP_API_URL + "/comment", params, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    })
}