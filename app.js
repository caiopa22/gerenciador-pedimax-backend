import express from "express";
import orderRouter from "./routes/order.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();
const port = 3000;

app.use(express.json())

app.use("/order", orderRouter)

app.use(errorHandler)

app.get("/health", (req, res) => {
  res.send({"status": "ok"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});