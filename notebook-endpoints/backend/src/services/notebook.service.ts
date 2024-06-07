import { v4 } from "uuid";
import { notebook } from "../interfaces/notebook";
import Connection from "../dbhelpers/dbhelper";

// let NotesBook: notebook[] = [];

export class notebookService {
  async createNotebook(note: notebook) {
    try {
      let result = (
        await Connection.execute("createNotebook", {
          id: v4(),
          title: note.title,
          content: note.content,
          createdAt: new Date().toString(),
        })
      ).rowsAffected;
      console.log("Result:", result);

      if (result[0] == 1) {
        return {
          message: "Notebook created successfully",
        };
      } else {
        return {
          error: "Unable to create notebook",
        };
      }
    } catch (error) {
      console.error("Error creating notebook:", error);
      throw new Error("Failed to create notebook");
    }
  }
}
