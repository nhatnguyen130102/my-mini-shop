//@ts-check
import { BaseService } from "../../common/base/base.service.js";
import { userRole } from "./user-role.model.js";

class UserRoleService extends BaseService {
    constructor() {
        super(userRole, ["user", "role"], "U")
    }

    async deleteHardMany(idArray, user) {
        if (!user || !user.id) {
            throw new Error("User is required")
        }

        const docs = await Promise.all(
            idArray.map(async (id) => {
                if (!id) {
                    throw new Error("Id is required")
                }

                const data = await userRole.findById(id)
                if (!data) {
                    throw new Error(`UserRole with id ${id} not found`)
                }

                await userRole.findByIdAndDelete(id)
                return data
            })
        )

        return docs
    }
}

const userRoleService = new UserRoleService()
export default userRoleService;
