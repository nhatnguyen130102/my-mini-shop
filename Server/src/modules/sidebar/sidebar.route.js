//@ts-check

import { BaseRoute } from "../../common/base/base.route.js";
import sidebarController from "./sidebar.controller.js";

const sidebarRoute = BaseRoute(sidebarController)
export default sidebarRoute;