//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import { BaseResponse } from "../../common/base/base.response.js";
import userRoleService from "./user-role.service.js";

export class UserRoleController extends BaseController {
    constructor() {
        super(userRoleService)
    }

    async deleteHardMany(req, res) {
        try {
            const result = await userRoleService.deleteHardMany(req.body, req.user);
            return res.json(BaseResponse(result, "Delete success", true));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Delete error: " + err.message, false));
        }
    }
}

const userRoleController = new UserRoleController()
export default userRoleController;