import express from "express";
import { notebookRouter } from "./routes/notebook.router";
import cors from "cors";

let app = express();

app.use(express.json());
app.use(cors());
app.use("/notebook", notebookRouter);
app.listen(3004, () => {
  console.log("Server is running on http://localhost:3004");
});
