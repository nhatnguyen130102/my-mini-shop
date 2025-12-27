//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { icon } from "./icon.model.js";
const iconService = new BaseService(
    icon,
    [],
    "IC"
)

export default iconService;
