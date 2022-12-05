import { Router } from 'express';

import { getWeatherForFavoriteCities } from '../controllers/weather';

const router = Router();

router.get('/', getWeatherForFavoriteCities);

export default router;
