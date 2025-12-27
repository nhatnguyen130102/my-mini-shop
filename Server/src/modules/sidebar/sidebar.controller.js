//@ts-check
import { BaseController } from "../../common/base/base.controller.js";
import { BaseResponse } from "../../common/base/base.response.js";
import sidebarService from "./sidebar.service.js";

class SidebarController extends BaseController {
    constructor() {
        super(sidebarService);
    }

    async create(req, res) {
        try {
            const result = await sidebarService.create(req.body, req.user);
            return res.json(BaseResponse(result, "Create success", true));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Create error: " + err.message, false));
        }
    }

    async update(req, res) {
        try {
            const result = await sidebarService.update(req.params.id, req.body, req.user);

            return res.json(BaseResponse(result, "Update success", true,));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Update error: " + err.message, false));
        }
    };
}

const sidebarController = new SidebarController();
export default sidebarController;
