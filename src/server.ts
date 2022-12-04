import express from "express";

import { AppDependencies } from "./lib/di";
import authRoutes from './routes/auth'

function serverFactory(deps: AppDependencies) {
  const { config } = deps;
  const app = express();

  app.use(express.json());

  app.use("/api/v1/auth", authRoutes);

  const port = config.HTTP.port;

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
  });
}



export default serverFactory;
