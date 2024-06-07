import { Request, Response } from "express";
import { notebookService } from "../services/notebook.service";

let notService = new notebookService();
let addNoteBook = async (req: Request, res: Response) => {
  try {
    let { title, content } = req.body;
    let response = await notService.createNotebook(req.body);
    console.log(response);
    return res.json(response);
  } catch (error: any) {
    return res.json({ error: error.message });
  }
};

const getALLNoteBooks = async (req: Request, res: Response) => {
  try {
    let notebooks = await notService.getNotebooks();
    return res.json({ notebooks });
  } catch (error: any) {
    return res.json({ error: error.message });
  }
};
const getOneNote = async (req: Request, res: Response) => {
  try {
    let { notes_id } = req.params;
    let notebook = await notService.fetchOneNote(notes_id);
    return res.json(notebook);
  } catch (error: any) {
    return res.json({ error: error.message });
  }
};
export { addNoteBook, getALLNoteBooks, getOneNote };
