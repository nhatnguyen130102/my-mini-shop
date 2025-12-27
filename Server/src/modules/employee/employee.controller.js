//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import employeeService from "./employee.service.js";

const employeeController = new BaseController(employeeService);
export default employeeController;