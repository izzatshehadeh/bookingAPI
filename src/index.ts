import express from "express";
import morganMiddleware from "./middlewares/morganMiddleware";
import Logger from "./helpers/logger";
import * as dotenv from 'dotenv';
import routes from "./routes/routes";
import * as http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import * as path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(morganMiddleware)
const options: cors.CorsOptions = {
  allowedHeaders: [
    '*',
  ],
  credentials: false,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));
app.use(bodyParser.json());

app.use(
  express.static(path.join(__dirname, "../web"))
);
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../web/index.html")
  );
});
app.use(routes);

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
  Logger.info(`Server is running on ${PORT}`);
});