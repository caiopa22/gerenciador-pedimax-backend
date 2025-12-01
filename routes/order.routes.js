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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints de gerenciamento de pedidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           example: "987"
 *         quantity:
 *           type: number
 *           example: 3
 *         price:
 *           type: number
 *           example: 29.9
 *
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           example: "12345"
 *         value:
 *           type: number
 *           example: 89.70
 *         creationDate:
 *           type: string
 *           format: date-time
 *           example: "2025-11-30T12:34:00Z"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 */


/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido para o usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numeroPedido
 *               - valorTotal
 *               - dataCriacao
 *               - items
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: "12345"
 *               valorTotal:
 *                 type: number
 *                 example: 89.90
 *               dataCriacao:
 *                 type: string
 *                 example: "2025-11-28T10:00:00.000Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                       example: "1"
 *                     quantidadeItem:
 *                       type: number
 *                       example: 2
 *                     valorItem:
 *                       type: number
 *                       example: 49.95
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Usuário não autenticado
 */
orderRouter.post(
    '/',
    validate(createOrderSchema, 'body'),
    auth,
    createOrder
);



/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       401:
 *         description: Usuário não autenticado
 */
orderRouter.get('/list', auth, getAllOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Busca um pedido específico do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 *       403:
 *         description: Usuário não tem permissão
 *
 *   put:
 *     summary: Atualiza um pedido do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *                 example: 120.50
 *               dataCriacao:
 *                 type: string
 *                 example: "2025-12-01T15:00:00Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                       example: "1"
 *                     quantidadeItem:
 *                       type: number
 *                       example: 5
 *                     valorItem:
 *                       type: number
 *                       example: 22.50
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       403:
 *         description: Usuário não tem permissão
 *
 *   delete:
 *     summary: Deleta um pedido do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       403:
 *         description: Usuário não tem permissão
 */

orderRouter.get('/:orderId', auth, getOrderById);

orderRouter.put('/:orderId', auth, updateOrder);

orderRouter.delete('/:orderId', auth, deleteOrder);

export default orderRouter;