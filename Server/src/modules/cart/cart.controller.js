//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import cartService from "./cart.service.js";

const cartController = new BaseController(cartService);
export default cartController;