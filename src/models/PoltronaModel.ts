import { Collection, ObjectId } from 'mongodb';
import { connectDb } from '../database/connection'; 

export default class PoltronaModel {

  private static async getCollection(): Promise<Collection> {
    const db = await connectDb();
    return db.collection('poltronas'); 
  }

  static async read(sala_id: ObjectId): Promise<any> {
    
    const collection = await this.getCollection();
    const poltronas = await collection.find({ sala_id: new ObjectId(sala_id) }).toArray();

    console.table(poltronas, ['numero_poltrona', 'status_poltrona']);
    
    return poltronas;
  }

  // const collection = await this.getCollection();
  //   const sessoes = await collection.find().toArray();

  //   const sessoesDetalhadas = await Promise.all(
  //     sessoes.map(async (sessao) => {
  //       const sala = await SalaModel.find(sessao.sala_id);
  //       const filme = await FilmeModel.find(sessao.filme_id);
  //       return {
  //         index: sessao.index,
  //         sala_id: sessao.sala_id.toString(),
  //         nome_sala: sala.nome,
  //         nome_filme: filme.titulo,
  //         horario_inicio: sessao.horario_inicio,
  //       };
  //     })
  //   );
  
  //   return sessoesDetalhadas;

  static async verificaPoltrona(poltrona_id: ObjectId): Promise<boolean> {
    const collection = await this.getCollection();
    const poltrona = await collection.findOne({ _id: poltrona_id });

    if (poltrona && poltrona.status_poltrona === 'OCUPADA') {
      return false; // Poltrona já ocupada
    }
    return true; // Poltrona disponível
  }

  static async ocupaPoltrona(poltrona_id: ObjectId) {
    const collection = await this.getCollection();
    
    const verificado = await this.verificaPoltrona(poltrona_id);
    if (!verificado) {
      console.log("Erro ao ocupar poltrona.");
      return;
    }

    await collection.updateOne(
      { _id: poltrona_id },
      { $set: { status_poltrona: 'OCUPADA' } }
    );

  }
}
