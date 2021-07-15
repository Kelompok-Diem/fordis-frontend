import axios from 'axios';
import { getAuthHeader } from './authHeader';

export const getAllPosts = async () => {
    try {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/post");

        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export const getPostById = async (id) => {
    try {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/post/" + id);

        return res.data;
    } catch (err) {
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

export const share = (post_id, title) => {
    navigator.clipboard.writeText("Check " + title + " in ForDis.\n" + window.location.href);

    axios.put(process.env.REACT_APP_API_URL + "/post/share/" + post_id, {}, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    })
}

export const deactivate = (post_id) => {
    axios.put(process.env.REACT_APP_API_URL + "/post/deactivate/" + post_id, {}, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    })
}

export const vote = (type, post_id) => {
    axios.put(process.env.REACT_APP_API_URL + "/post/vote/" + type + "/" + post_id, {}, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    })
}
