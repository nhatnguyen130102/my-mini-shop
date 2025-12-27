//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { cart } from "./cart.model.js";
const cartService = new BaseService(
    cart,
    ["product", "customer"],
    "CART"
)

export default cartService;
