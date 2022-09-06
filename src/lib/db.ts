import mysql from "mysql2";
import { Config } from "../config/config";

export function initDb(config: Config) {
  return mysql.createConnection(config.MYSQL);
}
