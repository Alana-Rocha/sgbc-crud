import { Collection, ObjectId } from "mongodb";
import { connectDb } from "../database/connection";

type IngressoModelProps = {
  sessao_id: ObjectId;
  poltrona_id: number;
  cpf_cliente: string;
};

export class IngressoModel implements IngressoModelProps {
  sessao_id: ObjectId;
  poltrona_id: number;
  cpf_cliente: string;

  constructor(props: IngressoModelProps) {
    Object.assign(this, props);
  }

  private static async getCollection(): Promise<Collection> {
    const db = await connectDb();
    return db.collection("ingressos");
  }

  static async create(ingresso: Omit<IngressoModel, "id">) {
    const collection = await this.getCollection();
    const result = await collection.insertOne(ingresso);
    return result;
  }

  static async read() {
    const collection = await this.getCollection();
    const ingressos = await collection.find().toArray();
    console.table(ingressos);
    return ingressos;
  }

  static async findByCpf(cpf: string) {
    const collection = await this.getCollection();
    const ingressos = await collection.find({ cpf_cliente: cpf }).toArray();
    return ingressos;
  }

  static async findBySessao(sessao_id: ObjectId): Promise<IngressoModel[]> {
    const collection = await this.getCollection();
    const ingressos = await collection.find({ sessao_id }).toArray();

    return ingressos;
  }

  static async count() {
    const collection = await this.getCollection();
    const count = await collection.countDocuments();
    return count;
  }

  static async delete(ingresso_id: string) {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(ingresso_id) },
      { $set: { updatedAt: new Date() } }
    );

    return result;
  }

  // Encontrar um ingresso por ID
  static async find(ingresso_id: string): Promise<IngressoModel | null> {
    const collection = await this.getCollection();
    const ingresso = await collection.findOne({
      _id: new ObjectId(ingresso_id),
    }); // Encontra ingresso pelo _id
    return ingresso;
  }
}
