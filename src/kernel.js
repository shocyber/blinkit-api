const express = require("express");
const cors = require("cors");
const routes = require("./routes/web");
class AppServer {
  app = express();
  constructor() {
    this.configuration();
    this.middlewares();
    this.initRoutes();
    this.exceptionHandling();
  }
  configuration() {
    this.app.use(express.json());
    this.app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
  }
  middlewares() {
    this.app.use((req, res, next) => {
      res.append("X-Developer", "ENJOYS");
      res.append("Api-Version", "v2.0");
      res.append("Author", "ENJOYS");
      next();
    });
  }
  exceptionHandling() {
    this.app.use((err, req, res, next) => {
      try {
        if (err) return;
        next(err);
      } catch (error) {}
    });
  }
  initRoutes() {
    this.app.use("/", routes);
    this.app.all("*", (req, res) =>
      res.send({
        name: "NOT_FOUND",
        message: "Route Not Configured",
        stack: { status: 404, info: "This is a unhandled route" },
      })
    );
  }
  RunApplication() {
    try {
      this.app.listen(5000, () => {
        console.log("http://localhost:5000");
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = AppServer;
