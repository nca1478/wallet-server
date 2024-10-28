import express from "express";
import { AppDataSource, envs } from "./config";
import { SoapServices } from "./soap";

const app = express();
const port = Number(envs.API_PORT);
const host = envs.API_HOST;

AppDataSource.initialize()
  .then(() => {
    const soapServices = new SoapServices(app);
    soapServices.start();

    app.listen(port, () => {
      console.log(`SOAP server running on ${host}:${port}/wsdl`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
