export const getAuthHeader = () => {
    const jwt_token = sessionStorage.getItem("user_token");

    const result = {
        headers: {
            "Authorization": "JWT " + jwt_token,
            "Content-Type": "application/json"
        }
    }

    return result;
}
