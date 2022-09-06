import mysql from "mysql2";
import { Config } from "../config/config";
import { initDb } from "./db";

export type AppDependencies = {
  db: mysql.Connection;
  config: Config;
};

async function createDependencyContainer(
  config: Config
): Promise<AppDependencies> {
  let db: ReturnType<typeof initDb>;

  const module = {
    get db() {
      if (!db) {
        db = initDb(config);
      }
      return db;
    },
    config,
  };
  return module;
}

export default createDependencyContainer;
