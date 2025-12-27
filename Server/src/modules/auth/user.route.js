//@ts-check

import authController from "./auth.controller.js";
import { BaseRoute } from "../../common/base/base.route.js";

const userRoute = BaseRoute(authController)
export default userRoute;