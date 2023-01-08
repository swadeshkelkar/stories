const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
                // console.log(req.headers);
            const token = req.headers.authorization.split(" ")[1];
                // console.log(token);
                const decoded = jwt.verify(token, "secret");
                
                next();
    } catch (err) {
        res.status(401).json({
            error: "Auth failed"
        })
    }
}