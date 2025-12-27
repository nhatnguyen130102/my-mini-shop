//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import customerTypeController from "./customer-type.controller.js";

const customerTypeRoute = BaseRoute(customerTypeController)
export default customerTypeRoute;