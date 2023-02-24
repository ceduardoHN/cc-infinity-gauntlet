import express from "express";
import { getDBConnection } from "../db/index.js";
import { validator } from "../middlewares/validator.js";

export const TodosRouter = express.Router();

TodosRouter.get("/to-dos", async function (request, response) {
  try {
    const db = await getDBConnection();

    const todos = await db.all("SELECT * FROM todos");

    await db.close();

    response.send({ todos });
  } catch (error) {
    response.status(500).send({
      message: "Something went wrong trying to get to dos",
      error,
    });
  }
});

TodosRouter.post(
  "/to-do",
  validator,
  async function (request, response) {
    try {
      const { title, description } = request.body;
      const db = await getDBConnection();

      await db.run(`
        INSERT INTO todos (title, description)
        VALUES (
          '${title}',
          '${description}'
        )
      `);

      await db.close();

      response.send({
        newTodo: { title, description },
      });
    } catch (error) {
      console.error(error);
      response.status(500).send({
        message: "Something went wrong trying to create a new to do",
        error,
      });
    }
  }
);

TodosRouter.delete("/to-do/:id", async function (request, response) {
  try {
    const id = request.params.id;

    const db = await getDBConnection();

    const todoExists = await db.run(
      `SELECT * FROM todos WHERE id = ?`,
      id
    );

    if (!todoExists.changes) {
      return response
        .status(404)
        .send({ message: "To Do Not Found" });
    }

    const deletionInfo = await db.run(
      `DELETE FROM todos WHERE id = ?`,
      id
    );

    await db.close();

    response.send({ deletionInfo });
  } catch (error) {
    response.status(500).send({
      message: "Something went wrong trying to get to delete a todo",
      error,
    });
  }
});

TodosRouter.patch("/to-do", async function (request, response) {});
