import config from "./config/config";
import createDependencyContainer from "./lib/di";
import serverFactory from "./server";

(async function run() {
  const di = await createDependencyContainer(config);
  serverFactory(di);
})();
