//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import colorService from "./color.service.js";

const colorController = new BaseController(colorService);
export default colorController;