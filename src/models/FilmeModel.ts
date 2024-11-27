import { Collection, ObjectId } from "mongodb";
import { connectDb } from "../database/connection";

type FilmeModelProps = {
  _id?: ObjectId;
  titulo: string;
  duracao: number;
  genero: string;
};

export class FilmeModel implements FilmeModelProps {
  _id?: ObjectId;
  titulo: string;
  duracao: number;
  genero: string;

  constructor(props: FilmeModelProps) {
    Object.assign(this, props);
  }

  private static async getCollection(): Promise<Collection> {
    const db = await connectDb();
    return db.collection("filmes");
  }

  static async create(filme: Omit<FilmeModel, "_id">) {
    const collection = await this.getCollection();
    const result = await collection.insertOne(filme);
    console.log("Filme cadastrado com sucesso!");
    return result;
  }

  static async read() {
    const collection = await this.getCollection();
    const filmes = await collection.find().toArray();
    console.table(filmes, ["titulo", "duracao", "genero"]);
    return filmes;
  }

  static async count() {
    const collection = await this.getCollection();
    const count = await collection.countDocuments();
    return count;
  }

  static async update(filme: FilmeModel) {
    const collection = await this.getCollection();
    await collection.updateOne(
      { _id: filme._id },
      {
        $set: {
          titulo: filme.titulo,
          duracao: filme.duracao,
          genero: filme.genero,
        },
      }
    );
    console.log("\nFilme atualizado com sucesso!\n");
  }

  static async delete(filme_id: string) {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(filme_id) });

    console.log("Filme removido com sucesso");

    return result;
  }

  static async find(filme_id: string): Promise<FilmeModel> {
    const collection = await this.getCollection();
    const filme = await collection.findOne({ _id: new ObjectId(filme_id) });

    if (!filme) {
      throw new Error(`Filme com ID ${filme_id} não encontrado.`);
    }

    return filme as FilmeModel;
  }
}
