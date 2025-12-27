//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import paymentMethodController from "./payment-method.controller.js";

const paymentMethodRoute = BaseRoute(paymentMethodController)
export default paymentMethodRoute;