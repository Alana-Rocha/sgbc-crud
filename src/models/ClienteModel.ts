import { Collection } from 'mongodb';
import { connectDb } from '../database/connection';

type ClienteModelProps = {
  cpf: string;
  nome_cliente: string;
  idade: number;
};

export class ClienteModel implements ClienteModelProps {
  cpf: string;
  nome_cliente: string;
  idade: number;

  constructor(props: ClienteModelProps) {
    Object.assign(this, props);
  }

  private static async getCollection(): Promise<Collection> {
    const db = await connectDb();
    return db.collection('clientes');
  }

  static async create(cliente: ClienteModel) {
    const collection = await this.getCollection();
    await collection.insertOne(cliente);
    console.log("\nCliente cadastrado com sucesso!!!\n");
  }

  static async count() {
    const collection = await this.getCollection();
    const count = await collection.countDocuments();
    return count;
  }

  static async findByCpf(cpf: string) {
    const collection = await this.getCollection();
    const cliente = await collection.findOne({ cpf });
    return cliente;
  }

  static async read() {
    const collection = await this.getCollection();
    const clientes = await collection.find().toArray();

    console.table(clientes, ['cpf', 'nome_cliente']);

    return clientes;
  }

  static async update(cliente: ClienteModel) {
    const collection = await this.getCollection();
    await collection.updateOne(
      { cpf: cliente.cpf },
      { $set: { nome: cliente.nome, idade: cliente.idade } }
    );
    console.log("\nCliente atualizado com sucesso!\n");
  }

  static async delete(cpf: string) {
    const collection = await this.getCollection();
    
    // // Deletar ingressos associados antes de deletar o cliente
    // const db = await connectDb();
    // const ingressoCollection = db.collection('ingressos');
    // await ingressoCollection.deleteMany({ cpf_cliente: cpf });
    
    await collection.deleteOne({ cpf });
    console.log("\nCliente deletado com sucesso!\n");
  }
}
