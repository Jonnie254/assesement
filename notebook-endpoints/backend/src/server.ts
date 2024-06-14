import express, { json } from "express";
import { notebookRouter } from "./router/notebook.router";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(json());

app.use("/notservice", notebookRouter);

const port = 3003;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
