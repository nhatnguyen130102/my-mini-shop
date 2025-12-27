//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import voucherService from "./voucher.service.js";

const voucherController = new BaseController(voucherService)
export default voucherController;