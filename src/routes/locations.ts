import { Router } from "express";

import { getCities } from "../controllers/locations";

const router = Router();

router.get("/", getCities);

export default router;