
const verifyApiKey = function(req, res, next) {
    if (req.headers["x-api-key"] !== process.env.API_KEY) {
        return res.status(401).json("Unauthorized");
    }
    next();
};


module.exports = {
    verifyApiKey,
};