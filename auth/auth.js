import jwt from "jsonwebtoken"
const jwtkey = "abcdefghijklmnopqrstuvwxyz12345"
import Model from '../model/model.js'


export const verifytoken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ message: 'Token not found' });
        }
        const decoded = jwt.verify(token, jwtkey);
        const user = await Model.findById(decoded.id);
        if(!user){
            return res.status(401).json({ message: 'User is not valid' });
        }
        req.user = user;
        next()
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid',error: error.message});
    }
}

export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!req.user.role.includes(roles)){
            return res.status(403).json({ message: `User with role ${req.user.role} is not authorized to access` });
        }
        next()
    }
}



