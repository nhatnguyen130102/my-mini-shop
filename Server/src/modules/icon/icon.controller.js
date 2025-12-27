//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import iconService from "./icon.service.js";

const iconController = new BaseController(iconService);
export default iconController;