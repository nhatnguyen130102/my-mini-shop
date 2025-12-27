//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import orderMethodController from "./order-method.controller.js";

const orderMethodRoute = BaseRoute(orderMethodController)
export default orderMethodRoute;