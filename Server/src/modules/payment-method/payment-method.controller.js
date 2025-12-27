//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import paymentMethodService from "./payment-method.service.js";

const paymentMethodController = new BaseController(paymentMethodService)
export default paymentMethodController;