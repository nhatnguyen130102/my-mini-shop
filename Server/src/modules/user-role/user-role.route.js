//@ts-check
import express from "express";
import { BaseRoute } from "../../common/base/base.route.js";
import userController from "./user-role.controller.js";

const router = BaseRoute(userController);

router.post("/delete/hardmany", async (req, res, next) => {
    try {
        const result = await userController.deleteHardMany(req, res);
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
});

export default router;
