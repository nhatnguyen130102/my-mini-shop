//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { order } from "./order.model.js";
const orderService = new BaseService(
    order,
    ["customer", "orderMethod", "paymentMethod", "employee", "product"],
    "ORD"
)

export default orderService;
