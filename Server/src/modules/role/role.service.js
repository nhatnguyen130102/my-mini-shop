//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { role } from "./role.model.js";

const roleService = new BaseService(role, [], "U")
export default roleService;