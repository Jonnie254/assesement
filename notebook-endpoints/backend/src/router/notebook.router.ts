import { Router } from "express";
import { addNoteBook } from "../controller/notebook.controller";

let notebookRouter = Router();
notebookRouter.post("/addNoteBook", addNoteBook);
export { notebookRouter };
