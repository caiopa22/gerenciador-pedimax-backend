import Joi from 'joi';

export const itemSchema = Joi.object({
    idItem: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'idItem não pode ser vazio',
            'any.required': 'idItem é obrigatório'
        }),

    quantidadeItem: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'quantidadeItem deve ser um número',
            'number.positive': 'quantidadeItem deve ser maior que zero',
            'any.required': 'quantidadeItem é obrigatório'
        }),

    valorItem: Joi.number()
        .positive()
        .required()
        .messages({
            'number.positive': 'valorItem deve ser maior que zero',
            'any.required': 'valorItem é obrigatório'
        })
});