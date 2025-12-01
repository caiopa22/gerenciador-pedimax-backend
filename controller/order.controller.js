import * as orderService from '../service/order.service.js';
import { AppError } from '../utils/AppError.js';

export const createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.body, req);
        return res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId, req);
        return res.status(200).json(order);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ "message": error.message });
        }
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders(req);
        return res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const params = req.params.orderId;
        if (!params) {
            return res.status(404).json({ "message": "Id do pedido é obrigatório" })
        }
        const order = await orderService.updateOrder(params, req.body, req);
        return res.status(200).json(order);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ "message": error.message });
        }
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const paramId = req.params.orderId;
        if (!paramId) {
            throw new AppError("Id do pedido é obrigatório", 400)
        }
        await orderService.deleteOrder(paramId, req);
        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ "message": error.message });
        }
        next(error);
    }
};