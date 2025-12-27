//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { customer } from "./customer.model.js";
const customerService = new BaseService(
    customer,
    ["user"],
    "CUS"
)

export default customerService;
