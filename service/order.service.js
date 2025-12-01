import prisma from '../config/database.js';
import { AppError } from '../utils/AppError.js';


const formatOrderOutput = (order) => {
    delete order.userId;
    order.items = order.items.map(item => {
        const { orderId, ...rest } = item;
        return rest;
    });
    return order;
}

export const createOrder = async (orderDTO, req) => {

    const orderData = {
        orderId: orderDTO.numeroPedido,
        userId: req.user.id,
        value: orderDTO.valorTotal,
        creationDate: new Date(orderDTO.dataCriacao),
        items: {
            create: orderDTO.items.map(item => ({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        }
    };

    const order = await prisma.order.create({
        data: orderData,
        include: { items: true }
    });

    return formatOrderOutput(order);
};

export const getOrderById = async (orderId, req) => {
    const order = await prisma.order.findUnique({
        where: { orderId },
        include: { items: true }
    });

    if (!order) {
        throw new AppError("Pedido não encontrado", 404)
    }

    if (order.userId !== req.user.id) {
        throw new AppError("Ação não permitida", 401)
    }

    return formatOrderOutput(order);
};

export const getAllOrders = async (req) => {
    const orders = await prisma.order.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            items: true
        },
        orderBy: {
            creationDate: 'desc'
        }
    });

    return orders.map((order) => formatOrderOutput(order))
};

export const updateOrder = async (orderId, updateDTO, req) => {
    const order = await prisma.order.findUnique({
        where: { orderId }
    });

    if (!order) {
        throw new AppError("Pedido não encontrado", 404)
    }

    if (order.userId !== req.user.id) {
        throw new AppError("Você não tem permissão para alterar esse pedido", 403)
    }

    const updateData = {};

    if (updateDTO.valorTotal !== undefined) {
        updateData.value = updateDTO.valorTotal;
    }

    if (updateDTO.dataCriacao !== undefined) {
        updateData.creationDate = new Date(updateDTO.dataCriacao);
    }

    if (updateDTO.items !== undefined) {
        updateData.items = {
            deleteMany: {},
            create: updateDTO.items.map(item => ({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
    }

    const updatedOrder = await prisma.order.update({
        where: { orderId },
        data: updateData,
        include: { items: true }
    });

    return formatOrderOutput(updatedOrder);
};

export const deleteOrder = async (orderId, req) => {

    const order = await prisma.order.findUnique({
        where: { orderId },
        select: { userId: true }
    });

    if (!order) {
        throw new AppError("Pedido não encontrado", 404)
    }

    if (order.userId !== req.user.id) {
        throw new AppError("Você não tem permissão para deletar esse pedido", 403)
    }

    const deleted = await prisma.order.delete({
        where: { orderId }
    });

    return deleted;
};