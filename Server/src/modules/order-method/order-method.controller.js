//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import orderMethodService from "./order-method.service.js";

const orderMethodController = new BaseController(orderMethodService)
export default orderMethodController;