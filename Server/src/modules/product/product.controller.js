//@ts-check
import { BaseController } from "../../common/base/base.controller.js";
import productService from "./product.service.js";

const productController = new BaseController(productService);
export default productController;
    