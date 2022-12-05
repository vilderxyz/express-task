import { Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from 'process';
import { QueryError, RowDataPacket } from 'mysql2';

import { RequestWithUser } from '../helpers/request-with-user';
import createDependencyContainer from '../lib/di';
import config from '../config/config';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    username: string;
  }
}

export const isAuth = async (req: RequestWithUser, res: Response, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).send('Not authenticated');
  }

  const token = authHeader.split(' ')[1];

  let payload: JwtPayload;

  try {
    payload = verify(token, env.APP_TOKEN_SECRET) as JwtPayload;
  } catch (err) {
    console.log(err);

    return res.status(401).send('Not authenticated');
  }

  const { db } = await createDependencyContainer(config);

  db.execute(
    'SELECT * FROM users WHERE username = ?',
    [payload?.username],
    (err: QueryError, result: RowDataPacket[]) => {
      if (err) {
        console.log(err);

        return res.status(500).send('Internal error');
      }

      if (result.length <= 0) {
        return res.status(401).send('Not authenticated');
      }

      const user = result[0];

      req.user = {
        id: user.id,
        username: user.username,
      };

      next();
    },
  );
};
