//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import roleController from "./role.controller.js";

const roleRoute = BaseRoute(roleController)
export default roleRoute;