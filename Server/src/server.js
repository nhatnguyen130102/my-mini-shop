//@ts-check
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import authRoute from './modules/auth/auth.route.js';
import productRoute from './modules/product/product.route.js';
import categoryRoute from './modules/category/category.route.js';
import colorRoute from './modules/color/color.route.js';
import sizeRoute from './modules/size/size.route.js';
import materialRoute from './modules/material/material.route.js';
import iconRoute from './modules/icon/icon.route.js';
import sidebarRoute from './modules/sidebar/sidebar.route.js';
import roleRoute from './modules/role/role.route.js';
import userRoleRoute from './modules/user-role/user-role.route.js';
import userRoute from './modules/auth/user.route.js';

import { AuthMiddleware } from './common/middleware/base.middleware.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/user', AuthMiddleware, userRoute)
app.use('/product', AuthMiddleware, productRoute);
app.use('/category', AuthMiddleware, categoryRoute);
app.use('/color', AuthMiddleware, colorRoute);
app.use('/size', AuthMiddleware, sizeRoute);
app.use('/material', AuthMiddleware, materialRoute);
app.use('/icon', AuthMiddleware, iconRoute);
app.use('/sidebar', AuthMiddleware, sidebarRoute);
app.use('/role', AuthMiddleware, roleRoute);
app.use('/user-role', AuthMiddleware, userRoleRoute);

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    });
