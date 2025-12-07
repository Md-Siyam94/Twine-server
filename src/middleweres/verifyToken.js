// verify token
const verifyToken = (req, res, next) => {
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Forbidden access' })
    }
    const token = req.headers?.authorization.splite(' ')[1]
    console.log(token);
    next()
}

module.exports = verifyToken