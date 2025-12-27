//@ts-check

import { BaseResponse } from "../base/base.response.js"
import jwt from "jsonwebtoken";

export const AuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader) {
            return res.status(401).json(BaseResponse(null, "Authorization header missing", false))
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json(BaseResponse(null, "Token missing", false));
        }

        const secret = process.env.JWT_SECRET || "default_secret";
        const decoded = jwt.verify(token, secret);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json(BaseResponse(null, "Invalid or expired token", false));
    }
}