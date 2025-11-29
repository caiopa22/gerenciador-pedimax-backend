// schemas/order.schema.js

import Joi from 'joi';
import { itemSchema } from './item.schema.js';


// Schema principal do pedido
export const createOrderSchema = Joi.object({
    numeroPedido: Joi.string()
        .required()
        .trim()
        .min(1)
        .messages({
            'string.empty': 'numeroPedido não pode ser vazio',
            'any.required': 'numeroPedido é obrigatório'
        }),

    valorTotal: Joi.number()
        .positive()
        .required()
        .messages({
            'number.positive': 'valorTotal deve ser maior que zero',
            'any.required': 'valorTotal é obrigatório'
        }),

    dataCriacao: Joi.date()
        .iso()
        .required()
        .messages({
            'date.format': 'dataCriacao deve estar no formato ISO 8601',
            'any.required': 'dataCriacao é obrigatório'
        }),

    items: Joi.array()
        .items(itemSchema)
        .min(1)
        .required()
        .messages({
            'array.min': 'items deve ter pelo menos 1 item',
            'any.required': 'items é obrigatório'
        })
});