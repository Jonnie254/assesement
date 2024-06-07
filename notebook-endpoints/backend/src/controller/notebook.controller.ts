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
export { addNoteBook };
