import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { env } from "process";
import { QueryError, RowDataPacket } from "mysql2";

import createDependencyContainer from "../lib/di";
import config from "../config/config";

export const login = async (req: Request, res: Response) => {
    const { body } = req;

    if (!body?.username || !body?.password) {
      return res.status(400).send("Invalid body parameters");
    }

    const { db } = await createDependencyContainer(config);

    db.execute("SELECT * FROM users WHERE username = ?", [body?.username], (err: QueryError, result: RowDataPacket[]) => {
      if (err) {
        console.log(err);

        return res.status(500).send("Internal error");
      }

      if (result.length <= 0) {
        return res.status(401).send("Invalid credentials");
      }

      const user = result[0];

      if (user.password !== body?.password) {
        return res.status(401).send("Invalid credentials");
      }

      const token = generateAccessToken(user.username);

      return res.json({
        "token": token,
        "message": "User successfully logged in",
      });
    });
};

function generateAccessToken(username: string): string {
    return sign({username: username}, env.APP_TOKEN_SECRET, {expiresIn: env.APP_TOKEN_EXPIRY});
}