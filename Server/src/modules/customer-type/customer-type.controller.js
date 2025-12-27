//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import customerTypeService from "./customer-type.service.js";

const customerTypeController = new BaseController(customerTypeService);
export default customerTypeController;