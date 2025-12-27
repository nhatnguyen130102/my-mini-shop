//@ts-check

import { BaseService } from "../../common/base/base.service.js";
import { HelperPopulate } from "../../common/helpers/populate.helper.js";
import { RandomCode } from "../../common/helpers/random.helper.js";
import { sidebar } from "./sidebar.model.js";

// async function buildPath(itemId) {
//     const path = [];

//     async function traverse(id) {
//         const node = await sidebar.findById(id);
//         if (!node) return;

//         path.push(node.path);
//         if (node.parentId) {
//             await traverse(node.parentId);
//         }
//     }

//     await traverse(itemId);

//     return path.reverse().join("/");
// }

async function buildPath(parentId, childPath) {
    if (!parentId) {
        return "/" + childPath.replace(/^\/+/, "");
    }

    const parent = await sidebar.findById(parentId);
    if (!parent) {
        return "/" + childPath.replace(/^\/+/, "");
    }

    // chuẩn hóa childPath
    const cleanChild = childPath.trim().replace(/^\/+/, "");

    // nối path cha + path con
    return `${parent.path}/${cleanChild}`;
}


class SidebarService extends BaseService {
    constructor() {
        super(sidebar, ["icon"], "SB");
    }

    async create(data, user) {

        data.code = RandomCode("SB");

        if (data.parentId === "") {
            delete data.parentId;
        }

        const exists = await sidebar.findOne({ name: data.name });
        if (exists) {
            throw new Error(`This item ${data.name} already existed`);
        }

        if (user && user.id) {
            data.createdBy = user.email;
        } else {
            throw new Error("User is required");
        }

        if (data.parentId) {
            data.path = await buildPath(data.parentId, data.path);
        } else {
            data.path = "/" + data.path.trim().replace(/^\/+/, "");
        }

        let path = data.path ?? "";

        path = path.trim();

        path = path.replace(/^\/+/, "");

        data.path = `/${path}`;

        data.level = data.path.split("/").length;

        const siblings = await sidebar.find({ parentId: data.parentId });
        data.sort = siblings.length + 1;

        const doc = new sidebar(data);
        const saved = await doc.save();

        let query = sidebar.findById(saved.id);
        query = HelperPopulate(query, ["icon"]);

        return await query;
    }

    async update(id, data, user) {
        if (!id) throw new Error("Id is required");

        const existing = await sidebar.findById(id);
        if (!existing) throw new Error("Document not found");

        const exists = await sidebar.find({ name: data.name });

        if (exists.length > 0 && exists[0]._id.toString() !== id.toString()) {
            throw new Error(`This item ${data.name} already existed`);
        }

        if ("code" in data) delete data.code;

        if (data.parentId === "") {
            delete data.parentId;
        }


        if (user && user.id) {
            existing.updatedBy = user.email;
        } else {
            throw new Error("User is required");
        }

        if (data.parentId) {
            data.path = await buildPath(data.parentId, data.path);
        } else {
            data.path = "/" + data.path.trim().replace(/^\/+/, "");
        }

        let path = data.path ?? "";

        path = path.trim();

        path = path.replace(/^\/+/, "");

        data.path = `/${path}`;

        data.level = data.path.split("/").length;

        const siblings = await sidebar.find({ parentId: data.parentId });
        data.sort = siblings.length + 1;

        let query = sidebar.findByIdAndUpdate(id, data, { new: true });
        query = HelperPopulate(query, this.populate);

        return await query;
    }

}

const sidebarService = new SidebarService();
export default sidebarService;
