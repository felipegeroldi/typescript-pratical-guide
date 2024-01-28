import 'reflect-metadata'
import express, { Application, Request, Response } from "express"; 
import Database from "./infra/db";
import { NewsController } from "./controller/newsController";
import { VideosController } from "./controller/videosController";
import { GaleriaController } from "./controller/galeriaController";
import { container } from "tsyringe";
import './shared/container'

class StartUp {
    public app!: Application;
    private _db: Database = new Database();
    private news = container.resolve(NewsController);
    private videos = container.resolve(VideosController);
    private galeria = container.resolve(GaleriaController);

    constructor() {
        this.app = express();
        this._db.createConnection();
        this.routes();
    }

    routes() {
        this.app.route("/").get((req, res) => {
            res.send({ versao: "0.0.1" });
        });

        this.app.route("/api/v1/news/:page/:qtd").get((req: Request, res: Response) => {
            return this.news.get(req, res);
        });


        this.app.route("/api/v1/news/:id").get((req: Request, res: Response) => {
            return this.news.getById(req, res);
        });


        this.app.route("/api/v1/videos/:id").get((req: Request, res: Response) => {
            return this.videos.getById(req, res);
        });

        this.app.route("/api/v1/videos/:page/:qtd").get((req: Request, res: Response) => {
            return this.videos.get(req, res);
        });



        this.app.route("/api/v1/galeria/:page/:qtd").get((req: Request, res: Response) => {
            return this.galeria.get(req, res);
        });


        this.app.route("/api/v1/galeria/:id").get((req: Request, res: Response) => {
            return this.galeria.getById(req, res);
        });
    }
}

export default new StartUp();