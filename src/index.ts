import express from "express";
import { AppDataSource, envs } from "./config";
import { SoapServices } from "./soap";

const app = express();
const port = Number(envs.PORT);

AppDataSource.initialize()
  .then(() => {
    const soapServices = new SoapServices(app);
    soapServices.start();

    app.listen(port, () => {
      console.log(`SOAP server running on http://localhost:${port}/wsdl`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
