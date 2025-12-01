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
import { loginUserSchema, registerUserSchema } from '../schemas/auth.schema.js';
import { auth, isSelfUser } from '../middlewares/authMiddleware.js';
import { alterUser, deleteUser, loginUser, registerUser } from '../controller/auth.controller.js';

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação e gerenciamento de usuário
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Caio Andrade"
 *               email:
 *                 type: string
 *                 example: "caioandrade@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
authRouter.post(
    '/register',
    validate(registerUserSchema, 'body'),
    registerUser
);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "caioandrade@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Email ou senha inválidos
 */
authRouter.post(
    '/login',
    validate(loginUserSchema, 'body'),
    loginUser
)


/**
 * @swagger
 * /auth/{userId}:
 *   delete:
 *     summary: Deleta o próprio usuário (precisa estar autenticado)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser deletado (precisa ser o mesmo do token)
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Usuário não pode deletar outro usuário
 *
 *   put:
 *     summary: Atualiza o username do próprio usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário que será atualizado (precisa ser o mesmo do token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "novo_username"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Nome inválido
 *       401:
 *         description: Não autenticado
 */
authRouter.delete(
    "/:userId",
    auth,
    isSelfUser,
    deleteUser
);

authRouter.put(
    "/:userId",
    auth,
    alterUser
)

export default authRouter;