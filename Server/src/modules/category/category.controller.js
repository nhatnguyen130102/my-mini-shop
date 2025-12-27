//@ts-check

import { BaseController } from "../../common/base/base.controller.js";
import categoryService from "./category.service.js";

const categoryController = new BaseController(categoryService)
export default categoryController;