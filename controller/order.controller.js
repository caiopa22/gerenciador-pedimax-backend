// controllers/order.controller.js
import * as orderService from '../service/order.service.js';

export const createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.body);
        return res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const params = req.params.orderId; 
        if (!params) {
            return res.status(404).json({ "message": "Id do pedido é obrigatório"})
        }
        const order = await orderService.updateOrder(params, req.body);
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        await orderService.deleteOrder(req.params.orderId);
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};