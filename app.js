import { errorHandler } from "./middlewares/errorHandler.js";
import express from "express";
import orderRouter from "./routes/order.routes.js";
import authRouter from "./routes/auth.routes.js";


const app = express();
const port = 3000;

app.use(express.json())

app.use("/order", orderRouter)
app.use("/auth", authRouter)

app.use(errorHandler)

app.get("/health", (req, res) => {
  res.send({"status": "ok"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});