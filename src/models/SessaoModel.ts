import { Collection, ObjectId } from 'mongodb';
import { connectDb } from '../database/connection';
import { FilmeModel } from './FilmeModel';
import  SalaModel  from './SalaModel';

export type SessaoModelProps = {
  filme_id: ObjectId;
  sala_id: ObjectId;
  horario_inicio: string;
};

export class SessaoModel implements SessaoModelProps {
  filme_id: ObjectId;
  sala_id: ObjectId;
  horario_inicio: string;

  constructor(props: SessaoModelProps) {
    Object.assign(this, props);
  }

  private static async getCollection(): Promise<Collection> {
    const db = await connectDb(); 
    return db.collection('sessoes');
  }

  static async create(sessao: Omit<SessaoModel, "id">) {
    const collection = await this.getCollection();
    await collection.insertOne(sessao);
    console.log("Sessão criada com sucesso!");
  }

  static async read() {
    const collection = await this.getCollection();
    const sessoes = await collection.find().toArray();

    const sessoesDetalhadas = await Promise.all(
      sessoes.map(async (sessao) => {
        const sala = await SalaModel.find(sessao.sala_id);
        const filme = await FilmeModel.find(sessao.filme_id);
        return {
          _id: sessao._id,
          index: sessao.index,
          sala_id: sessao.sala_id.toString(),
          nome_sala: sala.nome,
          nome_filme: filme.titulo,
          horario_inicio: sessao.horario_inicio,
        };
      })
    );
    
    console.table(sessoesDetalhadas, ['nome_sala', 'nome_filme', 'horario_inicio']);
    return sessoesDetalhadas;
  }

  static async update(sessao: SessaoModel) {
    const collection = await this.getCollection();
    await collection.updateOne(
      { _id: new ObjectId(sessao.filme_id) },
      { $set: { filme_id: sessao.filme_id, sala_id: sessao.sala_id, horario_inicio: sessao.horario_inicio } }
    );
    console.log("\nSessão atualizada com sucesso!\n");
  }

  static async find(sessao_id: ObjectId): Promise<SessaoModel | null> {
    const collection = await this.getCollection();
    const sessao = await collection.findOne({ _id: sessao_id });
    return sessao ? new SessaoModel(sessao as SessaoModelProps) : null; // Converte para SessaoModel
  }

  static async findByFilme(filme_id: ObjectId): Promise<SessaoModel[]> {
    const collection = await this.getCollection();
    const sessoes = await collection.find({ filme_id }).toArray();

    return sessoes;
  }

  static async count() {
    const collection = await this.getCollection();
    const count = await collection.countDocuments({ updatedAt: { $exists: false } });
    return count;
  }

  static async delete(id: ObjectId) {
    const collection = await this.getCollection();
    await collection.deleteOne(
      { _id: id }
    );

    console.log("Sessão excluída com sucesso.");
  }
}
