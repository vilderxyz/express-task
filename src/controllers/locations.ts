import { Response } from "express";
import { OkPacket, QueryError, RowDataPacket } from "mysql2";

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

export const addFavoriteCity = async (req: RequestWithUser, res: Response) => {
    const { user } = req;

    const { db } = await createDependencyContainer(config);

    db.execute("SELECT * FROM cities WHERE id = ?", [req.params.id], (err: QueryError, result: RowDataPacket[]) => {
        if (err) {
            console.log(err);

            return res.status(500).send("Internal error");
        }

        if (result.length <= 0) {
            return res.status(404).send("Location not found");
        }

        const city = result[0];

        db.execute("SELECT * FROM userCityRelations WHERE userId = ? AND cityId = ?", [user.id, city.id], (err: QueryError, result: RowDataPacket[]) => {
            if (err) {
                console.log(err);
    
                return res.status(500).send("Internal error");
            }

            if (result.length > 0) {
                return res.json({
                    "message": "City was already favorite",
                    "user": user,
                    "city": city,
                });
            }

            db.execute("INSERT INTO userCityRelations (userId, cityId) VALUES (?, ?)", [user.id, city.id], (err: QueryError, result: OkPacket) => {
                if (err) {
                    console.log(err);
        
                    return res.status(500).send("Internal error");
                }
        
                return res.json({
                    "message": "City was added to the favorites",
                    "user": user,
                    "city": city,
                });
            });
        });
    });
};