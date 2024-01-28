import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { IGaleriaService } from "../contracts/iGaleriaService";

@injectable()
export class GaleriaController {
    constructor(@inject('IGaleriaService') private _service: IGaleriaService) {
    }

    async get(request: Request, response: Response) {
        try {
            const page = request.params.page ? parseInt(request.params.page) : 1;
            const qtd = request.params.qtd ? parseInt(request.params.qtd) : 10;

            let result = await this._service.getAll(page, qtd);
            response.status(200).json({ result });
        } catch (error: any) {
            response.status(500).json({ error: error.message || error.toString })
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const id = request.params.id;

            let result = await this._service.get(id);
            response.status(200).json({ result });
        } catch (error: any) {
            response.status(500).json({ error: error.message || error.toString() });
        }
    }
}
