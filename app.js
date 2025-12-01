import { errorHandler } from "./middlewares/errorHandler.js";
import express from "express";
import orderRouter from "./routes/order.routes.js";
import authRouter from "./routes/auth.routes.js";
import { swaggerServe, swaggerSetup } from "./swagger.js";


const app = express();
const port = 3000;

// Uso de formato JSON durante a API 
app.use(express.json())

// Rotas para pedidos e autenticação na API (Tokens JWT)
app.use("/order", orderRouter)
app.use("/auth", authRouter)

// Documentação Swagger
app.use("/docs", swaggerServe, swaggerSetup);

// Middleware errorHandler para lidar com erros
app.use(errorHandler)


/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se o servidor está online
 *     description: Retorna o status "ok" para indicar que a API está funcionando.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servidor online
 *         content:
 *           application/json:
 *             example:
 *               status: "ok"
 */
// Verificação do servidor
app.get("/health", (req, res) => {
  res.send({ status: "ok" });
});

// Listener simples para saber que a API está em funcionamento
app.listen(port, () => {
  console.log(`Gerenciador Pedimax API rodando no port ${port}`);
});