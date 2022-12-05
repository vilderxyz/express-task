import express from "express";

import { AppDependencies } from "./lib/di";
import { isAuth } from "./middleware/is-auth";
import authRoutes from "./routes/auth"
import locationsRoutes from "./routes/locations"
import weaterRouters from "./routes/weather"

function serverFactory(deps: AppDependencies) {
  const { config } = deps;
  const app = express();

  app.use(express.json());

  app.use("/api/v1/auth", authRoutes);
  
  app.use("/api/v1", isAuth);
  app.use("/api/v1/locations", locationsRoutes)
  app.use("/api/v1/weather", weaterRouters)

  const port = config.HTTP.port;

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
  });
}



export default serverFactory;
