// @ts-check

import { normalizeString } from "../helpers/normalize-string.helper.js";
import { HelperPopulate } from "../helpers/populate.helper.js";
import { RandomCode } from "../helpers/random.helper.js";

export class BaseService {
    constructor(model, populate = [], codePrefix = "RD") {
        this.model = model;
        this.populate = populate;
        this.codePrefix = codePrefix;
    }

    async findAll(filter = {}, options = {}, user) {
        const { page = 1, limit, sort = { createdAt: -1 } } = options;
        const skip = limit ? (page - 1) * limit : 0;
        if (user && user.id) {

        } else {
            throw new Error("User is required");
        }
        const filterData = {
            ...filter,
            isDeleted: false,
        }
        let query = this.model.find(filterData).limit(limit).sort(sort).skip(skip);
        query = HelperPopulate(query, this.populate);
        const count = await this.model.countDocuments();
        const result = {
            data: await query,
            count: count,
        }
        return result;
    }

    async findById(id, user) {
        if (!id) throw new Error("Id is required");

        let query = this.model.findById(id);
        if (user && user.id) {

        } else {
            throw new Error("User is required");
        }

        query = HelperPopulate(query, this.populate);

        const record = await query;

        if (!record) throw new Error("Document not found");

        return record;
    }

    async create(data, user) {
        if ("code" in data) delete data.code;
        data.code = RandomCode(this.codePrefix);
        const exists = await this.model.findOne({ name: data.name })
        if (exists) throw new Error(`This item ${data.name}} already existed`);

        if (user && user.id) {
            data.createdBy = user.email;
        } else {
            throw new Error("User is required");
        }

        const doc = new this.model(data);
        const saved = await doc.save();

        let query = this.model.findById(saved.id);
        query = HelperPopulate(query, this.populate);

        return await query;
    }

    async update(id, data, user) {
        if (!id) throw new Error("Id is required");

        const existing = await this.model.findById(id);
        if (!existing) throw new Error("Document not found");

        const exists = await this.model.find({ name: data.name });

        if (exists.length > 0 && exists[0]._id.toString() !== id.toString()) {
            throw new Error(`This item ${data.name} already existed`);
        }

        if ("code" in data) delete data.code;

        if (user && user.id) {
            existing.updatedBy = user.email;
        } else {
            throw new Error("User is required");
        }

        let query = this.model.findByIdAndUpdate(id, data, { new: true });
        query = HelperPopulate(query, this.populate);

        return await query;
    }


    async createMany(dataArray, user) {
        const docs = await Promise.all(
            dataArray.map(async (data) => {
                if ("code" in data) delete data.code;

                const exists = await this.model.findOne({ name: data.name });
                if (exists) throw new Error(`This item ${data.name} already existed`);

                if (user && user.id) {
                    data.createdBy = user.email;
                } else {
                    throw new Error("User is required");
                }

                return {
                    ...data,
                    code: RandomCode(this.codePrefix),
                };
            })
        );

        const savedDocs = await this.model.insertMany(docs);

        const populatedDocs = await Promise.all(
            savedDocs.map(async (doc) => {
                let query = this.model.findById(doc.id);
                query = HelperPopulate(query, this.populate);
                return await query;
            })
        );

        return populatedDocs;
    }

    async delete(id, soft = true, user) {
        if (!id) throw new Error("Id is required");

        const existing = await this.model.findById(id);
        if (!existing) throw new Error("Document not found");

        if (user && user.id) {
            existing.updatedBy = user.email;
        } else {
            throw new Error("User is required");
        }

        if (soft) {
            return await this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        } else {
            return await this.model.findByIdAndDelete(id);
        }
    }

    async changeStatus(id, user) {
        if (!id) throw new Error("Id is required");

        const existing = await this.model.findById(id);
        if (!existing) throw new Error("Document not found");

        if (user && user.id) {
            existing.updatedBy = user.email;
        } else {
            throw new Error("User is required");
        }

        return await this.model.findByIdAndUpdate(
            id,
            { isActive: !existing.isActive },
            { new: true }
        );
    }
}
