import { Router } from "express";
import { addNoteBook } from "../controller/notebook.controller";
import { getALLNoteBooks } from "../controller/notebook.controller";

let notebookRouter = Router();
notebookRouter.post("/addNoteBook", addNoteBook);
notebookRouter.get("/getNoteBooks", getALLNoteBooks);
export { notebookRouter };
