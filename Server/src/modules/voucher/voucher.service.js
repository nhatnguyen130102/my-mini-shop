//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { voucher } from "./voucher.model.js";

const voucherService = new BaseService(voucher, [], "SZ")
export default voucherService;