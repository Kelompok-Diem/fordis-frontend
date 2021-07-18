import axios from 'axios';
import { getAuthHeader } from './authHeader';

export const createReport = (params, type, id) => {
    axios.post(process.env.REACT_APP_API_URL + "/report/" + type + "/" + id, params, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    })
}
