import express, { Request, Response } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import * as jwt from 'jsonwebtoken'
import {env} from 'process';

import { AppDependencies } from "./lib/di";

function serverFactory(deps: AppDependencies) {
  const { config } = deps;
  const app = express();

  app.use(express.json());

  app.post("/api/v1/auth/login", (req: Request, res: Response) => {
    const { body } = req;

    if (!body?.username || !body?.password) {
        res.statusMessage = "Invalid body parameters";

        return res.sendStatus(400);
    }

    deps.db.execute("SELECT * FROM users WHERE username = ?", [body?.username], (err: QueryError, result: RowDataPacket[]) => {
      if (err) {
        console.log(err);

        res.statusMessage = "Internal error";

        return res.sendStatus(500);
      }

      if (result.length <= 0) {
        res.statusMessage = "Invalid credentials";

        return res.sendStatus(401);
      }

      const user = result[0];

      if (user.password !== body?.password) {
        res.statusMessage = "Invalid credentials";

        return res.sendStatus(401);
      }

      const token = generateAccessToken(user.username);

      return res.json({
        "token": token,
        "message": "User successfully logged in",
      });
    });
  });

  const port = config.HTTP.port;

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
  });
}


function generateAccessToken(username: string): string {
  return jwt.sign({username: username}, env.APP_TOKEN_SECRET, {expiresIn: env.APP_TOKEN_EXPIRY});
}

export default serverFactory;
