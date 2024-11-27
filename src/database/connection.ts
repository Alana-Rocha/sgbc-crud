import { Db, MongoClient } from "mongodb";
import populateDatabase from "../database/populate-tables";

let client: MongoClient;
let db: Db;

export async function connectDb() {
  const mongoURI =
    process.env.MONGO_URI ||
    "mongodb+srv://victor7oliveiras:1lvIDXcDEsvmxPiu@sgbc.7qlne.mongodb.net/sgbc";

  if (client) {
    return db;
  }

  try {
    client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db("sgbc");
    await populateDatabase(db);
    return db;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}
export async function disconnectDb() {
  if (client) {
    await client.close();
  } else {
    console.log("Não há conexão ativa para ser desconectada.");
  }
}
