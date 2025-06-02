const jwt = require('jsonwebtoken')

const authMiddleware = (req,res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(404).json({
            success: false,
            message: 'Access denied, Please login to continue'
        });
    }

    //Decoding the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedToken;
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Access denied. Please try again"
        });
    };
}

module.exports = authMiddleware;