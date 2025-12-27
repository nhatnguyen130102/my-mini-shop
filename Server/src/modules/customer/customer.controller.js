//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import customerService from "./customer.service.js";

const customerController = new BaseController(customerService);
export default customerController;