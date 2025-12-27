//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import cartController from "./cart.controller.js";

const cartRoute = BaseRoute(cartController)
export default cartRoute;