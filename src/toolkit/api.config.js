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
            'Content-Type': 'multipart/form-data',
        }
        : {
            'Content-Type': 'multipart/form-data',
        };

    return {
        method: method,
        url: url,
        headers: headers,
        data: data,
    };
};

export default api;
