//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import customerController from "./customer.controller.js";

const customerRoute = BaseRoute(customerController)
export default customerRoute;