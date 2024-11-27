export type Cliente = {
  cpf: string;
  nome_cliente: string;
  idade: number;
};

export type Filme = {
  titulo: string;
  duracao: number;
  genero: string;
};

export type Sala = {
  nome: string;
  total_assentos: number;
};

export type Poltrona = {
  sala_id: string; // ou ObjectId, se estiver usando MongoDB ObjectId
  numero_poltrona: string;
  status_poltrona: "OCUPADA" | "DESOCUPADA";
};

export type Sessao = {
  filme_id: string; // ou ObjectId
  sala_id: string; // ou ObjectId
  horario_inicio: string; // ou Date, dependendo do formato
};

export type Ingresso = {
  sessao_id: string; // ou ObjectId
  poltrona_id: string; // ou ObjectId
  cpf_cliente: string;
};
