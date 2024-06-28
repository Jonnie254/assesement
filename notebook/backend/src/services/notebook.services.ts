import { PrismaClient } from "@prisma/client";
import { Notebook } from "../interfaces/notebook";
import { v4 as uuidv4 } from "uuid";
import { Res } from "../interfaces/res";

let prisma = new PrismaClient();

export class notebookService {
  async createNotebook(notebook: Notebook): Promise<Res> {
    try {
      await prisma.notebook.create({
        data: {
          id: uuidv4(),
          title: notebook.title,
          description: notebook.description,
          author: notebook.author,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
      return {
        success: true,
        message: "Notebook created successfully",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async getNotebookById(id: string): Promise<Res> {
    try {
      const notebook = await prisma.notebook.findUnique({
        where: {
          id: id,
        },
      });
      if (!notebook) {
        return {
          success: false,
          message: "Notebook not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "Notebook fetched successfully",
        data: notebook,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async updateNotebook(id: string, notebook: Notebook): Promise<Res> {
    try {
      // Check if the notebook exists
      const existingNotebook = await prisma.notebook.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingNotebook) {
        return {
          success: false,
          message: "Notebook not found",
          data: null,
        };
      }
      const updatedNotebook = await prisma.notebook.update({
        where: {
          id: id,
        },
        data: {
          title: notebook.title,
          description: notebook.description,
          author: notebook.author,
          updatedAt: new Date().toISOString(),
        },
      });

      return {
        success: true,
        message: "Notebook updated successfully",
        data: updatedNotebook,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async deleteNotebook(id: string): Promise<Res> {
    try {
      const existingNotebook = await prisma.notebook.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingNotebook) {
        return {
          success: false,
          message: "Notebook not found",
          data: null,
        };
      }

      await prisma.notebook.delete({
        where: {
          id: id,
        },
      });

      return {
        success: true,
        message: "Notebook deleted successfully",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async getNotebooks(): Promise<Res> {
    try {
      const notebooks = await prisma.notebook.findMany();
      return {
        success: true,
        message: "Notebooks fetched successfully",
        data: notebooks,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}
