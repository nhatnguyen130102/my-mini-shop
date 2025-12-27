//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import materialController from "./material.controller.js";

const materialRoute = BaseRoute(materialController)
export default materialRoute;