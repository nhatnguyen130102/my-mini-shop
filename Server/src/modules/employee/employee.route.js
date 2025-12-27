//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import employeeController from "./employee.controller.js";

const employeeRoute = BaseRoute(employeeController)
export default employeeRoute;