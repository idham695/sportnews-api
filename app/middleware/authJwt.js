const verifyToken = (req, res, next) => {
    let header = req.headers["authorization"];

    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        return res.status(403).send({ message: "Unauthorized" });
    }
}


const authJwt = {
    verifyToken
};

export default authJwt;