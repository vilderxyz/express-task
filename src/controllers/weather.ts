import { Response } from 'express';
import { QueryError, RowDataPacket } from 'mysql2';
import { env } from 'process';
import axios from 'axios';

import createDependencyContainer from '../lib/di';
import config from '../config/config';
import { RequestWithUser } from '../helpers/request-with-user';

export const getWeatherForFavoriteCities = async (
  req: RequestWithUser,
  res: Response,
) => {
  const { user } = req;

  console.log(user);

  const { db } = await createDependencyContainer(config);

  db.execute(
    'SELECT * FROM userCityRelations WHERE userId = ?',
    [user.id],
    (err: QueryError, result: RowDataPacket[]) => {
      if (err) {
        console.log(err);

        return res.status(500).send('Internal error');
      }

      if (result.length <= 0) {
        return res.json({
          message: 'Weather for favorite cities',
          user,
          weather: [],
        });
      }

      db.execute(
        'SELECT * FROM cities WHERE id IN (' +
          db.escape(result.map((r) => r.cityId)) +
          ')',
        async (err: QueryError, result: RowDataPacket[]) => {
          if (err) {
            console.log(err);

            return res.status(500).send('Internal error');
          }

          const citiesWithWeather = await Promise.all([
            await Promise.all(
              result.map(async (city) => {
                try {
                  const weather = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinate.x}&lon=${city.coordinate.y}&appid=${env.APP_OPENWEATHER_API_KEY}`,
                  );

                  return {
                    ...city,
                    data: weather.data,
                  };
                } catch (err) {
                  console.log(err);

                  return {
                    ...city,
                    data: null,
                  };
                }
              }),
            ),
          ]);

          return res.json({
            message: 'Weather for favorite cities',
            user,
            weather: citiesWithWeather,
          });
        },
      );
    },
  );
};
