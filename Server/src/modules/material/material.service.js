//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { material } from "./material.model.js";

const materialService = new BaseService(material, [], "MATE")
export default materialService;