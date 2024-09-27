import express, { Express, Request, Response } from "express";
import path from "path";
import { Server } from "http";
import cors from "cors";
// import { port } from "../config/webServer";
import router from "../routes/router";
import * as dotenv from "dotenv";
dotenv.config();
 
const app: Express = express();
let httpServer: Server;

const port = 3000
 
export const initServer = () => {
  return new Promise<void>((resolve, reject) => {

    app.use(express.json()); // JSON parsing middleware
    app.use(cors()); // CORS middleware
    app.use(express.urlencoded({ extended: true })); // URL-encoded body parsing middleware
    app.use(express.static(path.join(__dirname, "..", "public"))); // Static files middleware
 
    // Mount the routes
    app.use(process.env.BASE_URL || "/", router);
 
    // Handle 404 errors
    app.use((req: Request, res: Response) => {
      res.status(404).send("404: File Not Found");
    });
 
    // Start the server
    httpServer = app
      .listen(port, () => {
        console.log(`Web server listening on ${port}`);
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
 
export const closeServer = () => {
  return new Promise<void>((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};