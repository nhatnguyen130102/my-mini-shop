//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { color } from "./color.model.js";
const colorService = new BaseService(
    color,
    [],
    "CLR"
)

export default colorService;
