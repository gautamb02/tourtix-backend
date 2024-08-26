const express = require("express");
const cors = require("cors");
const path = require("path");

const sw_jsdoc = require("swagger-jsdoc");
const sw_ui = require("swagger-ui-express");

// Importing Constants file
const constants = require("./config/constants");

//Connecting to Mongo Database
const connectToMongo = require("./database/connect.db");
connectToMongo();

//instance of express
const app = express();
app.use(cors());
app.use(express.json());

port = constants.PORT;

//Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "team.html"));
});

app.use("/api/auth", require("./routes/auth.routes"));

// Swagger Docs

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TourTix APIs",
      version: "0.1",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = sw_jsdoc(swaggerOptions);
app.use("/docs", sw_ui.serve, sw_ui.setup(specs));

//Running the application
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
