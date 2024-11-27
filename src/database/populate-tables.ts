import { connectDb } from "../database/connection";

// Função para verificar se a coleção existe
import { Db } from "mongodb";
import { Cliente } from "../utils/types";

async function collectionExists(
  db: Db,
  collectionName: string
): Promise<boolean> {
  const collections = await db.listCollections().toArray();
  return collections.some((collection) => collection.name === collectionName);
}

export default async function populateDatabase(db : Db) {
  db = await connectDb();

  if (!db) {
    console.error("Falha ao conectar ao banco de dados.");
    return;
  }

  let populated = false;

  if (!(await collectionExists(db, "clientes"))) {
    const clientes: Cliente[] = [
      { cpf: "12345678901", nome_cliente: "José Curió", idade: 25 },
      { cpf: "12345678902", nome_cliente: "Cleiton Rasta", idade: 30 },
      { cpf: "12345678903", nome_cliente: "Marcelo Caipora", idade: 22 },
      { cpf: "12345678904", nome_cliente: "Julia Candida", idade: 35 },
      { cpf: "12345678905", nome_cliente: "Marcos Antunes", idade: 28 },
    ];
    await db
      .collection<Cliente>("clientes")
      .insertMany(clientes, { ordered: false });
    populated = true;
  }

  if (!(await collectionExists(db, "filmes"))) {
    const filmes = [
      { titulo: "A Volta dos que não foram", duracao: 120, genero: "Animação" },
      {
        titulo: "Candelabro, a história não contada",
        duracao: 150,
        genero: "Drama",
      },
      { titulo: "Matador de Manuel", duracao: 90, genero: "Comédia" },
      { titulo: "Morte Certa 2", duracao: 110, genero: "Terror" },
      { titulo: "Vingadoras", duracao: 100, genero: "Ação" },
    ];
    await db.collection("filmes").insertMany(filmes, { ordered: false });
    populated = true;
  }

  if (!(await collectionExists(db, "salas"))) {
    const salas = [
      { nome: "sala 1", total_assentos: 5 },
      { nome: "sala 2", total_assentos: 5 },
      { nome: "sala 3", total_assentos: 5 },
      { nome: "sala 4", total_assentos: 5 },
      { nome: "sala 5", total_assentos: 5 },
    ];
    await db.collection("salas").insertMany(salas, { ordered: false });
    populated = true;
  }

  if (!(await collectionExists(db, "poltronas"))) {
    const salasInseridas = await db.collection("salas").find().toArray();
    const poltronas = [
      {
        sala_id: salasInseridas[0]._id,
        numero_poltrona: "A1",
        status_poltrona: "OCUPADA",
      },
      {
        sala_id: salasInseridas[0]._id,
        numero_poltrona: "A2",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[0]._id,
        numero_poltrona: "A3",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[0]._id,
        numero_poltrona: "A4",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[0]._id,
        numero_poltrona: "A5",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[1]._id,
        numero_poltrona: "B1",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[1]._id,
        numero_poltrona: "B2",
        status_poltrona: "OCUPADA",
      },
      {
        sala_id: salasInseridas[1]._id,
        numero_poltrona: "B3",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[1]._id,
        numero_poltrona: "B4",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[1]._id,
        numero_poltrona: "B5",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[2]._id,
        numero_poltrona: "C1",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[2]._id,
        numero_poltrona: "C2",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[2]._id,
        numero_poltrona: "C3",
        status_poltrona: "OCUPADA",
      },
      {
        sala_id: salasInseridas[2]._id,
        numero_poltrona: "C4",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[2]._id,
        numero_poltrona: "C5",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[3]._id,
        numero_poltrona: "D1",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[3]._id,
        numero_poltrona: "D2",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[3]._id,
        numero_poltrona: "D3",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[3]._id,
        numero_poltrona: "D4",
        status_poltrona: "OCUPADA",
      },
      {
        sala_id: salasInseridas[3]._id,
        numero_poltrona: "D5",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[4]._id,
        numero_poltrona: "E1",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[4]._id,
        numero_poltrona: "E2",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[4]._id,
        numero_poltrona: "E3",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[4]._id,
        numero_poltrona: "E4",
        status_poltrona: "DESOCUPADA",
      },
      {
        sala_id: salasInseridas[4]._id,
        numero_poltrona: "E5",
        status_poltrona: "OCUPADA",
      },
    ];
    await db.collection("poltronas").insertMany(poltronas, { ordered: false });
    populated = true;
  }

  if (!(await collectionExists(db, "sessoes"))) {
    const filmesInseridos = await db.collection("filmes").find().toArray();
    const salasInseridas = await db.collection("salas").find().toArray();
    const sessoes = [
      {
        filme_id: filmesInseridos[0]._id,
        sala_id: salasInseridas[0]._id,
        horario_inicio: "2024-10-16 10:00:00",
      },
      {
        filme_id: filmesInseridos[1]._id,
        sala_id: salasInseridas[1]._id,
        horario_inicio: "2024-10-16 13:00:00",
      },
      {
        filme_id: filmesInseridos[2]._id,
        sala_id: salasInseridas[2]._id,
        horario_inicio: "2024-10-16 16:00:00",
      },
      {
        filme_id: filmesInseridos[3]._id,
        sala_id: salasInseridas[3]._id,
        horario_inicio: "2024-10-16 19:00:00",
      },
      {
        filme_id: filmesInseridos[4]._id,
        sala_id: salasInseridas[4]._id,
        horario_inicio: "2024-10-16 21:00:00",
      },
    ];
    await db.collection("sessoes").insertMany(sessoes, { ordered: false });
    populated = true;
  }

  if (!(await collectionExists(db, "ingressos"))) {
    const sessoesInseridas = await db.collection("sessoes").find().toArray();
    const poltronasInseridas = await db
      .collection("poltronas")
      .find()
      .toArray();
    const ingressos = [
      {
        sessao_id: sessoesInseridas[0]._id,
        poltrona_id: poltronasInseridas[0]._id,
        cpf_cliente: "12345678901",
      },
      {
        sessao_id: sessoesInseridas[1]._id,
        poltrona_id: poltronasInseridas[6]._id,
        cpf_cliente: "12345678902",
      },
      {
        sessao_id: sessoesInseridas[2]._id,
        poltrona_id: poltronasInseridas[12]._id,
        cpf_cliente: "12345678903",
      },
      {
        sessao_id: sessoesInseridas[3]._id,
        poltrona_id: poltronasInseridas[18]._id,
        cpf_cliente: "12345678904",
      },
      {
        sessao_id: sessoesInseridas[4]._id,
        poltrona_id: poltronasInseridas[24]._id,
        cpf_cliente: "12345678905",
      },
    ];
    await db.collection("ingressos").insertMany(ingressos, { ordered: false });
    populated = true;
  }

  if (populated) {
    const collectionsPopulated: string[] = [
      "clientes",
      "filmes",
      "salas",
      "poltronas",
      "sessoes",
      "ingressos",
    ];
    const missingCollections: string[] = [];

    for (const collection of collectionsPopulated) {
      const exists = await collectionExists(db, collection);
      if (!exists) missingCollections.push(collection);
    }

    if (missingCollections.length === 0) {
      console.log("Banco de dados populado com sucesso!");
    } else {
      console.log("Faltaram as coleções:", missingCollections);
    }
  }
}

// populateDatabase().catch(console.error);
