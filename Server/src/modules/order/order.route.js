//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import orderController from "./order.controller.js";

const orderRoute = BaseRoute(orderController)
export default orderRoute;