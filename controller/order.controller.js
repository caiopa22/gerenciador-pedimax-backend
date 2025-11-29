// controllers/order.controller.js
import * as orderService from '../service/order.service.js';

export const createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.body);
        return res.status(201).json({
            success: true,
            message: 'Pedido criado com sucesso!',
            data: order
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        return res.status(200).json({ success: true, data: order });
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
        const order = await orderService.updateOrder(req.params.orderId, req.body);
        return res.status(200).json({ success: true, message: 'Atualizado!', data: order });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        await orderService.deleteOrder(req.params.orderId);
        return res.status(200).json({ success: true, message: 'Deletado!' });
    } catch (error) {
        next(error);
    }
};