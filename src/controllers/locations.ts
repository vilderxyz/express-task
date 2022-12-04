import { Response } from "express";
import { QueryError, RowDataPacket } from "mysql2";

import createDependencyContainer from "../lib/di";
import config from "../config/config";
import { RequestWithUser } from "../helpers/request-with-user";

export const getCities = async (req: RequestWithUser, res: Response) => {
    const { user } = req;

    const { db } = await createDependencyContainer(config);

    db.execute("SELECT * FROM cities", (err: QueryError, result: RowDataPacket[]) => {
        if (err) {
            console.log(err);

            return res.status(500).send("Internal error");
        }

        res.json({
            "message": "User verified and list of all cities is returned",
            "user": user,
            "cities": result,
        });
    });
};