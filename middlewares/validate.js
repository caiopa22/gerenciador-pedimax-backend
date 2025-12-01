// middlewares/validate.js

/**
 * Middleware genérico para validação com Joi
 * @param {Joi.Schema} schema - Schema usado para validar
 * @param {string} source - Local da requisição a validar (body, params, query)
 */
export const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const dataToValidate = req[source];

        // Valida os dados recebidos
        const { error, value } = schema.validate(dataToValidate, {
            abortEarly: false,     // mostra todos os erros, não só o primeiro
            stripUnknown: true,    // remove campos não permitidos
            convert: true          // converte tipos automaticamente
        });

        // Caso existam erros, retorna resposta padronizada
        if (error) {
            const errors = error.details.map(err => ({
                campo: err.path.join('.'),
                mensagem: err.message,
                tipo: err.type
            }));

            return res.status(400).json({
                success: false,
                error: 'Erro de validação',
                details: errors
            });
        }

        // Substitui o conteúdo da requisição pelos dados validados
        req[source] = value;
        
        next();
    };
};
