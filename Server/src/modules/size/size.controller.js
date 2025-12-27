//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import sizeService from "./size.service.js";

const sizeController = new BaseController(sizeService)
export default sizeController;