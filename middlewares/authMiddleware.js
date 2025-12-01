import jwt from "jsonwebtoken";

/**
 * Middleware de autenticação usando JWT
 */
export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se existe header Authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Token não definido." });
  }

  // Extrai o token após "Bearer ..."
  const token = authHeader.split(" ")[1];

  try {
    // Valida o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // injeta o usuário na req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expirado ou inválido." });
  }
}

// Middleware para verificar se o usuário da rota é o mesmo do token
export const isSelfUser = (req, res, next) => {
  const routeId = Number(req.params.userId);

  // Permite apenas se o id no token for igual ao id da rota
  if (routeId !== req.user.id) {
    return res.status(403).json({ message: "Ação não permitida." });
  }

  next();
};
