import prisma from '../config/database.js';
import { AppError } from '../utils/AppError.js';

// Função para formatar a saida da API com o padrão pedido no desafio.
const formatOrderOutput = (order) => {
    // Retira o userId da order
    delete order.userId;
    // Para cada item dessa order, remover o orderId
    order.items = order.items.map(item => {
        const { orderId, ...rest } = item;
        return rest;
    });
    return order;
}

// Função para criação de pedidos
export const createOrder = async (orderDTO, req) => {

    // Transformando informações do DTO para o padrão pedido.
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

    // Criação do pedido pelo prisma, incluindo items no output.
    const order = await prisma.order.create({
        data: orderData,
        include: { items: true }
    });

    return formatOrderOutput(order);
};

// Função para buscar pedido por id
export const getOrderById = async (orderId, req) => {
    const order = await prisma.order.findUnique({
        where: { orderId },
        include: { items: true }
    });

    // Caso não tenha pedidos com esse id, erro 404
    if (!order) {
        throw new AppError("Pedido não encontrado", 404)
    }

    // Caso o usuário vinculado a esse pedido não é o mesmo da requisição, bloquear
    if (order.userId !== req.user.id) {
        throw new AppError("Ação não permitida", 401)
    }

    return formatOrderOutput(order);
};

// Função para listar todos os pedidos do usuário da requisição
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

// Função para editar um pedido
export const updateOrder = async (orderId, updateDTO, req) => {
    // Encontra o pedido pelo orderId
    const order = await prisma.order.findUnique({
        where: { orderId }
    });

    // Caso não pedido não exista, erro 404
    if (!order) {
        throw new AppError("Pedido não encontrado", 404)
    }

    // Caso o usuário vinculado a esse pedido não é o mesmo da requisição, bloquear
    if (order.userId !== req.user.id) {
        throw new AppError("Você não tem permissão para alterar esse pedido", 403)
    }

    const updateData = {};

    // Caso exista valorTotal, atualizar
    if (updateDTO.valorTotal !== undefined) {
        updateData.value = updateDTO.valorTotal;
    }

    // Caso exista dataCriacao, atualizar
    if (updateDTO.dataCriacao !== undefined) {
        updateData.creationDate = new Date(updateDTO.dataCriacao);
    }

    // Se items foram enviados, remove todos os itens antigos
    // e cria novos com as informações atualizadas
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

    // Atualiza os dados pelo prisma
    const updatedOrder = await prisma.order.update({
        where: { orderId },
        data: updateData,
        include: { items: true }
    });

    return formatOrderOutput(updatedOrder);
};

// Função para deletar um pedido
export const deleteOrder = async (orderId, req) => {

    // Buscando pedido pelo orderId
    const order = await prisma.order.findUnique({
        where: { orderId },
        select: { userId: true }
    });

    // Caso não tenha pedidos com esse id, erro 404
    if (!order) {
        throw new AppError("Pedido não encontrado", 404)
    }

    // Caso o usuário vinculado a esse pedido não é o mesmo da requisição, bloquear
    if (order.userId !== req.user.id) {
        throw new AppError("Você não tem permissão para deletar esse pedido", 403)
    }

    // Deleta o pedido pelo prisma
    const deleted = await prisma.order.delete({
        where: { orderId }
    });

    return deleted;
};