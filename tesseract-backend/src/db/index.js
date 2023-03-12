import { open } from "sqlite";
import driver from "sqlite3";

export async function getDBConnection() {
  try {
    const db = await open({
      filename: "db.sqlite",
      driver: driver.Database
    });

    if (!db) {
      throw new TypeError(`DB Connection expected, got: ${db}`);
    }

    return db;
  } catch (e) {
    console.e(
      `There was an error trying to connect to the DBMS: ${e.message}`,
      e
    );
  }
}

export async function initDB() {
  try {
    const db = await getDBConnection();

    //exec se usa para hacer sentencias en sql
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        is_done INTEGER DEFAULT 0
      )
    `);

    await db.close();
  } catch (e) {
    console.e(
      `There was an error trying to init the DB: ${e.message}`,
      e
    );
  }
}
