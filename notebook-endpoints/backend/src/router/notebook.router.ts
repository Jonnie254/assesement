import { Router } from "express";
import { addNoteBook } from "../controller/notebook.controller";
import { getALLNoteBooks } from "../controller/notebook.controller";
import { getOneNote } from "../controller/notebook.controller";

let notebookRouter = Router();
notebookRouter.post("/addNoteBook", addNoteBook);
notebookRouter.get("/getNoteBooks", getALLNoteBooks);
notebookRouter.get("/getNotebook/:id", getOneNote);
export { notebookRouter };
