import { Db, MongoClient } from "mongodb";
import populateDatabase from "../database/populate-tables";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDb() {
  const mongoURI =
    process.env.MONGO_URI ||
    "mongodb+srv://smartRanking:TSsMoUnou1cqvUyH@smartranking.n9oxy.mongodb.net/?retryWrites=true&w=majority&appName=smartRanking";

  if (client) {
    return db;
  }

  try {
    client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db("smartRanking");
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
