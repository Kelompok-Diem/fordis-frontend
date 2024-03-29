import axios from 'axios';
import { getAuthHeader } from './authHeader';

export const register = (params) => {
    axios.post(process.env.REACT_APP_API_URL + "/auth/register", params).then((res) => {
        console.info(res);

        login(params);
    }).catch((err) => {
        console.error(err);
    })
}

export const login = (params) => {
    axios.post(process.env.REACT_APP_API_URL + "/auth/login", params).then((res) => {
        console.info(res);

        sessionStorage.setItem("user_token", res.data.token);
        window.location.reload();
    }).catch((err) => {
        console.error(err);
    })
}

export const getProfile = async () => {
    try {
        const result = await axios.get(process.env.REACT_APP_API_URL + "/profile", getAuthHeader());

        return result.data;
    } catch(err) {
        console.error(err);
    }
}

export const getUser = async (user_id) => {
    try {
        const result = await axios.get(process.env.REACT_APP_API_URL + "/auth/" + user_id, getAuthHeader());

        return result.data;
    } catch(err) {
        console.error(err);
    }
}

export const updateUser = async (params) => {
    axios.put(process.env.REACT_APP_API_URL + "/auth/update/", params, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    });
}

export const promoteModerator = async(user_id) => {
    axios.put(process.env.REACT_APP_API_URL + "/auth/moderator/" + user_id, {}, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    });
}

export const deleteUser = (user_id) => {
    axios.delete(process.env.REACT_APP_API_URL + "/auth/delete/" + user_id, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    });
}

export const logOut = () => {
    sessionStorage.removeItem("user_token");
}
