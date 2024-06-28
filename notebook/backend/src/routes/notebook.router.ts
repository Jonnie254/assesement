import { Router } from "express";
import {
  createNotebook,
  deleteNotebook,
  getNotebookById,
  getNotebooks,
  updateNotebook,
} from "../controllers/notebook.controller";
let notebookRouter = Router();

notebookRouter.post("/create", createNotebook);
notebookRouter.get("/getone/:id", getNotebookById);
notebookRouter.get("/getall", getNotebooks);
notebookRouter.put("/update/:id", updateNotebook);
notebookRouter.delete("/delete/:id", deleteNotebook);

export { notebookRouter };
