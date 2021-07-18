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

export const getAllReports = async () => {
    try {
        let res = await axios.get(process.env.REACT_APP_API_URL + "/report");

        const types = ["user", "post", "comment"];

        for (const type of types) {
            if (type === "comment") {
                res.data.comment = await Promise.all(res.data.comment.map(async (value) => {
                    let comment_res = await axios.get(process.env.REACT_APP_API_URL + "/comment/" + value.comment_id);

                    return {
                        ...value,
                        route: "/post/" + comment_res.data.post_id + "#" + value.comment_id,
                    }
                }))
            } else {
                res.data[type] = res.data[type].map((value) => {
                    return {
                        ...value,
                        route: "/" + (type === "user" ? "profile" : type) + "/" + value[type + "_id"],
                    }
                })
            }
        }

        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export const deleteReport = (report_id) => {
    axios.delete(process.env.REACT_APP_API_URL + "/report/delete/" + report_id, getAuthHeader()).then((res) => {
        console.info(res);

        window.location.reload();
    }).catch((err) => {
        console.error(err);
    });
}
