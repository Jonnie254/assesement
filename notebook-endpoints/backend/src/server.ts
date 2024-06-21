import express, { json } from "express";
import { notebookRouter } from "./router/notebook.router";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(json());
//function for cors
const allowedOrigins = ["http://localhost:4200"];

// Configure CORS
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use("/notservice", notebookRouter);

const port = 4201;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
