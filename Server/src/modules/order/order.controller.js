//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import orderService from "./order.service.js";

const orderController = new BaseController(orderService);
export default orderController;