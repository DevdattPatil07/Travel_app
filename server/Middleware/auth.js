import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Log in Again, Something went wrong",
            error: error.message,
        });
    }
};

export default auth;
