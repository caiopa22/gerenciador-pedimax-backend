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
import { auth } from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.post(
    '/',
    validate(createOrderSchema, 'body'),
    createOrder
);

orderRouter.get('/list', auth, getAllOrders);

orderRouter.get('/:orderId', auth, getOrderById);

orderRouter.put('/:orderId', auth, updateOrder);

orderRouter.delete('/:orderId', auth, deleteOrder);

export default orderRouter;