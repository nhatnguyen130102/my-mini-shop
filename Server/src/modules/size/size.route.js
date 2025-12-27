//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import sizeController from "./size.controller.js";

const sizeRoute = BaseRoute(sizeController)
export default sizeRoute;