/**
 * Middleware global de tratamento de erros
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Erro capturado:', err);

    // Erro do Prisma - Chave duplicada
    if (err.code === 'P2002') {
        return res.status(409).json({
            success: false,
            error: 'Registro duplicado',
            message: 'Um registro com estes dados já existe',
            field: err.meta?.target
        });
    }

    // Erro do Prisma - Registro não encontrado
    if (err.code === 'P2025') {
        return res.status(404).json({
            success: false,
            error: 'Registro não encontrado',
            message: 'O registro solicitado não existe'
        });
    }

    // Erro do Prisma - Violação de constraint
    if (err.code === 'P2003') {
        return res.status(400).json({
            success: false,
            error: 'Erro de integridade referencial',
            message: 'Operação viola restrições do banco de dados'
        });
    }

    // Erro genérico
    return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' 
            ? err.message 
            : 'Ocorreu um erro inesperado'
    });
};