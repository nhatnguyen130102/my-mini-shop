//@ts-check
import { BaseRoute } from "../../common/base/base.route.js";
import productController from "./product.controller.js";

const productRoute = BaseRoute(productController);
export default productRoute;
