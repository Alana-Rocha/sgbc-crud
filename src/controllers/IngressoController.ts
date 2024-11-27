import console from "console";
import { IngressoModel } from "../models/IngressoModel";
import { SessaoModel } from "../models/SessaoModel";
import { scan } from "../utils/scan";
import { ClienteModel } from "../models/ClienteModel";
import PoltronaModel from "../models/PoltronaModel";

export class IngressoController {
  async inserir() {
    const sessoes = await SessaoModel.read();
    const sessaoIndex: number = +scan("Índice da Sessão: ");
    if (sessaoIndex < 0 || sessaoIndex >= sessoes.length) {
      console.log("Índice de sessão inválido. Voltando ao menu principal...");
      return;
    }
    const sessao = sessoes[sessaoIndex];

    const poltronas = await PoltronaModel.read(sessao.sala_id);
    const poltronaIndex = +scan("Índice da Poltrona: ");
    if (poltronaIndex < 0 || poltronaIndex >= poltronas.length) {
      console.log("Índice de poltrona inválido. Voltando ao menu principal...");
      return;
    }
    
    const poltrona = poltronas[poltronaIndex];
    if(!await PoltronaModel.verificaPoltrona(poltrona._id)){
      console.log("Poltrona escolhida já ocupada! Voltando ao menu principal...");
      return;
    }

    await ClienteModel.read();
    const cpf_cliente = scan("CPF do Cliente: ");
    const cliente = await ClienteModel.findByCpf(cpf_cliente);
    if (!cliente) {
      console.log("Este CPF não existe em nossa base de dados.");
      console.log("Voltando para o menu principal...");
      return;
    }

    await PoltronaModel.ocupaPoltrona(poltrona._id);

    const ingresso = new IngressoModel({
      cpf_cliente,
      poltrona_id: poltrona._id,
      sessao_id: sessao._id,
    });

    await IngressoModel.create(ingresso);
    console.log("Ingresso inserido com sucesso!");
  }
}
