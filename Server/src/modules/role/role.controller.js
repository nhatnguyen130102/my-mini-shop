//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import roleService from "./role.service.js";

const roleController = new BaseController(roleService)
export default roleController;