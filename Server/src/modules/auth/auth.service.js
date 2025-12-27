//@ts-check
import { user } from "./auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RandomCode } from "../../common/helpers/random.helper.js";
import { BaseService } from "../../common/base/base.service.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export class AuthService extends BaseService {
    constructor() {
        super(user, [""], "U");
    }
    async register(data) {
        const { email, password, username } = data;
        const exists = await user.findOne({ email: email, username: username })
        if (exists) throw new Error("Email/Username already registered");
        const hashPassword = bcrypt.hashSync(password, 10);
        const payload = {
            ...data,
            name: username,
            code: RandomCode("USER"),
            password: hashPassword
        }
        const userData = new user(payload);
        await userData.save();

        return this.generateToken(userData)
    };

    async login(data) {
        const { email, password } = data;
        const userData = await user.findOne({ email: email });
        if (!userData) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) throw new Error("Invalid credentials")

        return this.generateToken(userData);
    };

    async getMe(userId) {
        const userData = await user.findById(userId).select("-password");
        if (!userData) {
            throw new Error("User not found");
        }
        return userData;
    }

    generateToken(user) {
        const payload = { id: user._id, email: user.email, username: user.username };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3600s" });
        return { token, user: { id: user._id, email: user.email, username: user.username } };
    }
}

const authService = new AuthService();
export default authService;
