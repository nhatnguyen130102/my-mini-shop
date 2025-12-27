//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { category } from "./category.model.js"
const categoryService = new BaseService(
    category,
    [],
    "CAT",
)

export default categoryService;