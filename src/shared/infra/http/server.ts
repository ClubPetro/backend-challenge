import { app } from "./app";
import { datasource } from "../typeorm";
import "../../../shared/container";

const Port = 3333;

datasource.initialize().then(() => {
  app.listen(`${Port}`, () => {
    return console.log(`Server started on port ${Port}! 🏆`);
  });
});

export default app;
