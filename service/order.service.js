// services/order.service.js
import prisma from '../config/database.js';

export const createOrder = async (orderDTO) => {
    const orderData = {
        orderId: orderDTO.numeroPedido,
        value: orderDTO.valorTotal,
        creationDate: new Date(orderDTO.dataCriacao),
        items: {
            create: orderDTO.items.map(item => ({
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        }
    };

    return await prisma.order.create({
        data: orderData,
        include: { items: true }
    });
};

export const getOrderById = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: { orderId },
        include: { items: true }
    });

    if (!order) {
        const error = new Error('Pedido não encontrado');
        error.statusCode = 404;
        throw error;
    }

    return order;
};

export const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: { items: true },
        orderBy: { creationDate: 'desc' }
    });
};

export const updateOrder = async (orderId, updateDTO) => {
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
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
    }

    return await prisma.order.update({
        where: { orderId },
        data: updateData,
        include: { items: true }
    });
};

export const deleteOrder = async (orderId) => {
    return await prisma.order.delete({
        where: { orderId }
    });
};