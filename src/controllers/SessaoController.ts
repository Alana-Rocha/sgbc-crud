import { FilmeModel } from "../models/FilmeModel";
import { IngressoModel } from "../models/IngressoModel";
import SalaModel from "../models/SalaModel";
import { SessaoModel } from "../models/SessaoModel";
import { scan } from "../utils/scan";

export class SessaoController {
  async inserir() {
    const filmes = await FilmeModel.read();
    const filmeIndex = +scan("Índice do filme: ");
    const filme = filmes[filmeIndex];

    const salas = await SalaModel.read();
    const salaIndex = +scan("Índice da sala: ");
    const sala = salas[salaIndex];

    const horario_dia = scan("Digite o dia de inicio do filme (DD): ");

    const horario_mes = scan("Digite o mês de inicio do filme (MM): ");

    const horario_ano = scan("Digite o ano de inicio do filme (AAAA): ");

    const horario_hora = +scan("Digite a hora de inicio do filme (hh): ");

    const horario_minuto = scan("Digite os minutos de inicio do filme (mm): ");

    const horario_inicio = `${horario_ano}-${horario_mes}-${horario_dia} ${horario_hora.toString()}:${horario_minuto}:00`;

    const sessao = new SessaoModel({ 
      filme_id: filme._id, 
      sala_id: sala._id, 
      horario_inicio 
    });

    await SessaoModel.create(sessao);
  }

  async atualizar() {
    const sessoes = await SessaoModel.read();

    const sessaoIndex = +scan("Índice da sessão que deseja atualizar: ");
    if (sessaoIndex < 0 || sessaoIndex >= sessoes.length) {
      console.log("Índice de sessao inválido. Voltando ao menu principal...");
      return;
    }
    const sessao = sessoes[sessaoIndex];

    const filmes = await FilmeModel.read();
    const novoFilmeIndex = +scan("Indice do novo filme: ");
    if (novoFilmeIndex < 0 || novoFilmeIndex >= filmes.length) {
      console.log("Índice de filme inválido. Voltando ao menu principal...");
      return;
    }
    const novoFilme = filmes[novoFilmeIndex];

    const salas = await SalaModel.read();
    const novaSalaIndex = +scan("Index da nova sala: ");
    if (novaSalaIndex < 0 || novaSalaIndex >= salas.length) {
      console.log("Índice de sala inválido. Voltando ao menu principal...");
      return;
    }
    const novaSala = salas[novaSalaIndex];

    const novo_horario_dia = scan("Digite o dia de inicio do filme (DD): ");

    const novo_horario_mes = scan("Digite o mês de inicio do filme (MM): ");

    const novo_horario_ano = scan("Digite o ano de inicio do filme (AAAA): ");

    const novo_horario_hora =
      +scan("Digite a hora de inicio do filme (hh): ") - 3;

    const novo_horario_minuto = scan(
      "Digite os minutos de inicio do filme (mm): "
    );

    const novo_horario_inicio = `${novo_horario_ano}-${novo_horario_mes}-${novo_horario_dia} ${novo_horario_hora.toString()}:${novo_horario_minuto}:00`;

    const nova_sessao = {
      filme_id: novoFilme._id,
      sala_id: novaSala._id,
      horario_inicio: novo_horario_inicio,
      _id: sessao._id,
    };

    await SessaoModel.update(nova_sessao);
    return;
  }

  async listar() {
    await SessaoModel.read();
    scan("Aperte a tecla Enter para continuar >>>");
  }

  async excluir() {

    const sessoes = await SessaoModel.read();
    const sessaoIndex = +scan("Digite o índice da sessão que deseja excluir: ");
    const sessao = sessoes[sessaoIndex];

    const sessaoFilme = await SessaoModel.find(sessao._id);

    if (!sessaoFilme) {
      console.log("Esta sessão não existe em nossa base de dados.");
      console.log("Voltando para o menu principal...");
      return;
    }

    const ingressosVinculados = await IngressoModel.findBySessao(sessao._id);

    if(ingressosVinculados.length > 0){
      console.log("Não foi possível excluir esta sessão pois há ingressos vinculados a essa sessão.");
      return;
    }

    let mensagemAviso = "Confirmar ação? (1-Sim | 2-Não): ";

    const confirmarAcao = scan(mensagemAviso);

    if (confirmarAcao !== "1") {
      console.log("Voltando para o menu principal...");
      return;
    }

    await SessaoModel.delete(sessao._id);
  }
}
