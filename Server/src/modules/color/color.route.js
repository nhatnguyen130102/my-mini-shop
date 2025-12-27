//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import colorController from "./color.controller.js";

const colorRoute = BaseRoute(colorController)
export default colorRoute;