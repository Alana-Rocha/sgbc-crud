import { MongoClient, Db } from 'mongodb';
import populateDatabase from '../database/populate-tables';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDb() {

  const mongoURI = process.env.MONGO_URI || 'mongodb+srv://victor7oliveiras:1lvIDXcDEsvmxPiu@sgbc.7qlne.mongodb.net/sgbc';

  if (client) {
    return db;
  }

  try {
    client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db('sgbc');  // Substitua 'sgbc' pelo nome do banco de dados desejado
    await populateDatabase();
    return db;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

export async function disconnectDb() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  } else {
    console.log("Não há conexão ativa para ser desconectada.");
  }
}
