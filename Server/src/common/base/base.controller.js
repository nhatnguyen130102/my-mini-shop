import { BaseResponse } from "./base.response.js";

//@ts-check
export class BaseController {
    constructor(service) {
        this.service = service
    }

    async getAll(req, res) {
        try {
            const { page, limit, sort, ...filter } = req.query;
            const result = await this.service.findAll(filter, { page, limit, sort }, req.user);

            return res.json(BaseResponse(result.data, "Get all success", true, result.count));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Get all error: " + err.message, false));
        }
    };

    async getById(req, res) {
        try {
            const result = await this.service.findById(req.params.id, req.user);

            return res.json(BaseResponse(result, "Get by id success", true,));
        } catch (err) {
            return res.status(404).json(BaseResponse(null, "Get by id error: " + err.message, false));
        }
    };

    async create(req, res) {
        try {
            const result = await this.service.create(req.body, req.user);

            return res.json(BaseResponse(result, "Create success", true,));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Create error: " + err.message, false));
        }
    };

    async createMany(req, res) {
        try {
            const result = await this.service.createMany(req.body, req.user);

            return res.json(BaseResponse(result, "Create many success", true,));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Create many error: " + err.message, false));
        }
    }

    async update(req, res) {
        try {
            const result = await this.service.update(req.params.id, req.body, req.user);

            return res.json(BaseResponse(result, "Update success", true,));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Update error: " + err.message, false));
        }
    };

    async delete(req, res) {
        try {
            const result = await this.service.delete(req.params.id, req.query.soft !== "false", req.user);

            return res.json(BaseResponse(result, "Delete success", true,));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Delete error: " + err.message, false));
        }
    };

    async changeStatus(req, res) {
        try {
            const result = await this.service.changeStatus(req.params.id, req.user);

            return res.json(BaseResponse(result, "Change status success", true,));
        } catch (err) {
            return res.status(400).json(BaseResponse(null, "Change status error: " + err.message, false));
        }
    }
}