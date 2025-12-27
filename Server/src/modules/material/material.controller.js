//@ts-check
import { BaseController } from "../../common/base/base.controller.js";
import materialService from "./material.service.js";

const materialController = new BaseController(materialService)
export default materialController;