import { Collection, ObjectId } from "mongodb";
import { connectDb } from "../database/connection";

type SalaModelProps = {
  nome: string;
  total_assentos: number;
};

export default class SalaModel {
  nome: string;
  total_assentos: number;

  private static async getCollection(): Promise<Collection> {
    const db = await connectDb();
    return db.collection("salas");
  }

  static async read() {
    const collection = await this.getCollection();
    const salas = await collection.find().toArray();

    console.table(salas, ["nome", "total_assentos"]);
    return salas;
  }

  static async find(sala_id: string): Promise<SalaModel> {
    const collection = await this.getCollection();
    const sala = await collection.findOne<SalaModel>({
      _id: new ObjectId(sala_id),
    }); // Especifica o tipo esperado

    if (!sala) {
      throw new Error(`Sala com ID ${sala_id} não encontrada.`);
    }

    return sala;
  }
}
