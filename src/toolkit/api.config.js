const api = (method, path, data = null, token = null, multipartFormData, s) => {
    const config = {
        baseUrl: "http://localhost/api/",
        path: path,
        token: token,
    };

    const url = config.baseUrl + config.path;

    const headers = config.token
        ? {
            Authorization: `Bearer ${config.token}`,
            'Content-Type': 'application/json',
        }
        : {
            'Content-Type': 'application/json',
        };

    return {
        method: method,
        url: url,
        headers: headers,
        data: data,
    };
};

export default api;
