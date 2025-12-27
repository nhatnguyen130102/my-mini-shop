//@ts-check
import { Router } from "express";
export const BaseRoute = (controller) => {
    const router = Router();

    router.get("/getAll", async (req, res) => {
        controller.getAll(req, res);
    });

    router.get("/getBy/:id", async (req, res) => {
        controller.getById(req, res);
    });

    router.put("/update/:id", async (req, res) => {
        controller.update(req, res);
    });

    router.post("/create", async (req, res) => {
        controller.create(req, res);
    });

    router.post("/create/many", async (req, res) => {
        controller.createMany(req, res);
    });

    router.delete("/delete/:id", async (req, res) => {
        controller.delete(req, res);
    });

    router.put("/changeStatus/:id", async (req, res) => {
        controller.changeStatus(req, res);
    });

    return router;
}