import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dbMethpds from "./db/db_methods";
import { pool } from "./db/db_config";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.set("trust proxy", true);

app.get("/test", async (req: Request, res: Response) => {
  const data = await dbMethpds.getTableData("progers");
  res.json(data);
});

app.get("/test/:id", async (req: Request, res: Response) => {
  const data = await dbMethpds.getItemById("progers", req.params.id);
  res.json(data);
});

app.post("/test", async (req: Request, res: Response) => {
  const data = await dbMethpds.addItem(req.body, "progers");
  res.json(data);
});

app.put("/test/:id", async (req: Request, res: Response) => {
  const data = await dbMethpds.updateItem(req.body, "progers", req.params.id);
  if (!data) {
    res.status(404).send("Item was not found...");
    return;
  }
  res.json(data);
});

app.delete("/test/:id", async (req: Request, res: Response) => {
  const data = await dbMethpds.removeItemById("progers", req.params.id);
  if (!data) {
    res.status(404).send("Item was not found...");
    return;
  }
  res.send("Item removed");
});

const start = async () => {
  pool.on("connect", () => {});
  app.listen(port, () => {
    console.log(`app has startd on ${port} port`);
  });
};

start();
