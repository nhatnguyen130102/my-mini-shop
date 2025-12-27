//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import categoryController from "./category.controller.js";

const categoryRoute = BaseRoute(categoryController);
export default categoryRoute;