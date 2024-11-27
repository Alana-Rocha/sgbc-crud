import { SessaoController } from "../controllers/SessaoController";
import { connectDb } from '../database/connection';

export default class Relatorio {
  
  static async ingVendidos() {
    const pipeline = [
      {
        $lookup: {
          from: "sessoes",
          localField: "sessao_id",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "filmes",
                localField: "filme_id",
                foreignField: "_id",
                as: "filme_info"
              }
            },
            { $unwind: "$filme_info" } 
          ],
          as: "sessao_info"
        }
      },
      { $unwind: "$sessao_info" },
      {
        $group: {
          _id: "$sessao_info.filme_info.titulo",
          total_ingressos: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          nome_filme: "$_id",
          total_ingressos: 1
        }
      }
    ];

    const db = await connectDb();
    const vendas = await db.collection("ingressos").aggregate(pipeline).toArray();
    console.table(vendas, ['nome_filme', 'total_ingressos']);
    return vendas;
  };
  

  static async sessoesAbertas() {
    const sessaoController = new SessaoController();
    await sessaoController.listar();
    return;
  }
}
