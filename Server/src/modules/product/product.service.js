//@ts-check
import { BaseService } from "../../common/base/base.service.js"
import { product } from "./product.model.js"

const productService = new BaseService(
    product,
    ["category", "color", "material", "size"],
    "PRD"
)

export default productService
