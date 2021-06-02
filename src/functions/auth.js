import axios from 'axios';

export const register = (params) => {
    axios.post(process.env.REACT_APP_API_URL + "/auth/register", params).then((res) => {
        console.info(res);
    }).catch((err) => {
        console.error(err);
    })
}

export const login = (params) => {
    axios.post(process.env.REACT_APP_API_URL + "/auth/login", params).then((res) => {
        console.info(res);

        sessionStorage.setItem("user_token", res.data.token);
    }).catch((err) => {
        console.error(err);
    })
}

const getAuthHeader = () => {
    const jwt_token = sessionStorage.getItem("user_token");

    const result = {
        headers: {
            "Authorization": "JWT " + jwt_token,
            "Content-Type": "application/json"
        }
    }

    return result;
}

export const getProfile = async () => {
    try {
        const result = await axios.post(process.env.REACT_APP_API_URL + "/profile", {}, getAuthHeader());
        console.info(result);

        return result.data;
    } catch(err) {
        console.error(err);
    }

    return "UwU";
}
