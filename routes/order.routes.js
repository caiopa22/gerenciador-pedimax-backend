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

const orderRouter = express.Router();

orderRouter.post(
    '/',
    validate(createOrderSchema, 'body'),
    createOrder
);

// GET /order/list - Listar todos
orderRouter.get('/list', getAllOrders);

// GET /order/:orderId - Buscar por ID
orderRouter.get('/:orderId', getOrderById);

// PUT /order/:orderId - Atualizar
orderRouter.put('/:orderId', updateOrder);

// DELETE /order/:orderId - Deletar
orderRouter.delete('/:orderId', deleteOrder);

export default orderRouter;