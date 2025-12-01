import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não definido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // coloca o usuário dentro da req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expirado ou inválido." });
  }
}

export const isSelfUser = (req, res, next) => {
  const routeId = Number(req.params.userId);
  if (routeId !== req.user.id) {
    return res.status(403).json({ message: "Ação não permitida." });
  }
  next();
};
