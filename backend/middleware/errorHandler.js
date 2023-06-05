export const errorHandler = (err, req, res, next) => {
    const status = res.statusCode || 500;

    switch (status) {
        case 400:
            res.status(status).send({
                title: "Validation Failed",
                message: err.message,
            });
            break;
        case 404:
            res.status(status).send({
                title: "Not Found",
                message: err.message,
            });
            break;
        case 401:
            res.status(status).send({
                title: "Un authorized",
                message: err.message,
            });
            break;
        case 403:
            res.status(status).send({
                title: "Forbidden",
                message: err.message,
            });
            break;
        case 500:
            res.status(status).send({
                title: "Server Error",
                message: err.message,
            });
            break;
        default:
            console.log("No error, All good !");
            break;
    }
};
