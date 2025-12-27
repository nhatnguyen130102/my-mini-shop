//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { customerType } from "./customer-type.model.js";
const customerTypeService = new BaseService(
    customerType,
    [],
    "CUST"
)

export default customerTypeService;
