//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { employee } from "./employee.model.js";
const employeeService = new BaseService(
    employee,
    ["user"],
    "EMP"
)

export default employeeService;
