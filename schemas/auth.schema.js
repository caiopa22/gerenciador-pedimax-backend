import Joi from 'joi';

export const registerUserSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.empty': 'username não pode ser vazio',
            'any.required': 'username é obrigatório'
        }),
    email: Joi.string()
        .required()
        .messages({
            'string.empty': 'email não pode ser vazio',
            'any.required': 'email é obrigatório'
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'password não pode ser vazio',
            'any.required': 'password é obrigatório'
        })
});

export const loginUserSchema = Joi.object({
    email: Joi.string()
        .required()
        .messages({
            'string.empty': 'email não pode ser vazio',
            'any.required': 'email é obrigatório'
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'password não pode ser vazio',
            'any.required': 'password é obrigatório'
        })
});