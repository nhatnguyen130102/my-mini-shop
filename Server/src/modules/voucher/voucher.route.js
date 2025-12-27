//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import voucherController from "./voucher.controller.js";

const voucherRoute = BaseRoute(voucherController)
export default voucherRoute;