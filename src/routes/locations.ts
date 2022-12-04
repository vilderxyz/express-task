import { Router } from "express";

import { addFavoriteCity, getCities } from "../controllers/locations";

const router = Router();

router.get("/", getCities);
router.post("/:id/favorite", addFavoriteCity);

export default router;