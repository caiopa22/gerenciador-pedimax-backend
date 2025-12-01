/**
 * Middleware global de tratamento de erros
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Erro capturado:', err);

    const formatError = (message, status) => res.status(status).json({ "message": message });

    if (err.code === 'P2002') {
        return formatError('Um registro com estes dados já existe', 409);
    }

    if (err.code === 'P2025') {
        return formatError('O registro solicitado não existe', 404);
    }

    if (err.code === 'P2003') {
        return formatError('Operação viola restrições do banco de dados', 400);
    }

    return res.status(500).json({
        message: "Ocorreu um erro inesperado.",
        details: err.message
    });
};
