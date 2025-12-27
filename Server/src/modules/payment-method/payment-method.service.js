//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { paymentMethod } from "./payment-method.model.js";

const paymentMethodService = new BaseService(paymentMethod, [], "SZ")
export default paymentMethodService;