// routes/order.routes.js

import express from 'express';
import { validate } from '../middlewares/validate.js';
import { createOrderSchema } from '../schemas/order.schema.js';
import {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder
} from '../controller/order.controller.js';
import { loginAdminSchema, registerAdminSquema } from '../schemas/auth.schema.js';
import { alterAdmin, deleteAdmin, loginAdmin, registerAdmin } from '../controller/auth.controller.js';
import { auth, isSelfAdmin } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post(
    '/register',
    validate(registerAdminSquema, 'body'),
    registerAdmin
);

authRouter.post(
    '/login',
    validate(loginAdminSchema, 'body'),
    loginAdmin
)

authRouter.delete(
    "/:adminId",
    auth,
    isSelfAdmin,
    deleteAdmin
);

authRouter.put(
    "/:adminId",
    auth,
    alterAdmin
)

export default authRouter;