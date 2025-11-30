// middlewares/validate.js

/**
 * Middleware de validação usando Joi
 * @param {Joi.Schema} schema - Schema Joi para validação
 * @param {string} source - Origem dos dados: 'body', 'params', 'query'
 */
export const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const dataToValidate = req[source];

        const { error, value } = schema.validate(dataToValidate, {
            abortEarly: false,
            stripUnknown: true,
            convert: true 
        });

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

        // Substitui os dados originais pelos validados
        req[source] = value;
        
        next();
    };
};