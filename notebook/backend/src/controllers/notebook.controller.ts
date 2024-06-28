import { Request, Response } from "express";
import { notebookService } from "../services/notebook.services";
import { Res } from "../interfaces/res";

let service = new notebookService();
export const createNotebook = async (req: Request, res: Response) => {
  let notebook = req.body;
  let response: Res = await service.createNotebook(notebook);
  if (response.success) {
    res.status(201).json(response);
  } else {
    res.status(400).json(response);
  }
};
export const getNotebookById = async (req: Request, res: Response) => {
  let id = req.params.id;
  let response: Res = await service.getNotebookById(id);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};

export const getNotebooks = async (req: Request, res: Response) => {
  let response: Res = await service.getNotebooks();
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};

export const updateNotebook = async (req: Request, res: Response) => {
  let id = req.params.id;
  let notebook = req.body;
  let response: Res = await service.updateNotebook(id, notebook);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};

export const deleteNotebook = async (req: Request, res: Response) => {
  let id = req.params.id;
  let response: Res = await service.deleteNotebook(id);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};
