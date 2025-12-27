//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { orderMethod } from "./order-method.model.js";

const orderMethodService = new BaseService(orderMethod, [], "SZ")
export default orderMethodService;