import { IGaleriaService } from "../contracts/iGaleriaService";
import { Result } from "../infra/result";
import { Galeria } from "../models/galeria";
import { GaleriaRepository } from "../repository/galeriaRepository";

export class GaleriaService implements IGaleriaService {
    async get(id: string): Promise<Galeria | any> {
        let result = await GaleriaRepository.findById(id);
        return result;
    }
    async getAll(page: number, qtd: number): Promise<Result<Galeria>> {
        let result = new Result<Galeria>();
        result.Page = page;
        result.Qtd = qtd;
        result.Total = await GaleriaRepository.countDocuments({});
        result.Data = await GaleriaRepository.find({})
            .skip((page * qtd) - qtd)
            .limit(qtd);

        return result;
    }
}