//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import { BaseResponse } from "../../common/base/base.response.js";
import authService from "./auth.service.js";


class AuthController extends BaseController {
    constructor() {
        super(authService);
    }
    async register(req, res) {
        try {
            const result = await authService.register(req.body);

            res.status(201).json(BaseResponse(result));
        } catch (err) {
            res.status(400).json(BaseResponse(null, err.message, false));
        }
    }

    async login(req, res) {
        try {
            const result = await authService.login(req.body);
            res.json(BaseResponse(result));
        } catch (err) {
            res.status(400).json(BaseResponse(null, err.message, false));
        }
    }

    async getMe(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json(BaseResponse(null, "Unauthorized", false));
            }

            const user = await authService.getMe(req.user.id);
            return res.json(BaseResponse(user));
        } catch (err) {
            return res.status(404).json(BaseResponse(null, err.message, false));
        }
    }
};

const authController = new AuthController();
export default authController;

