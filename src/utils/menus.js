export function menuInicial() {
  console.log(`
         
╔╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╗
╠╬╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╬╣
╠╣                                                                      ╠╣
╠╣    █████████   ███                           █████████   ████  ████  ╠╣
╠╣   ███░░░░░███ ░░░                           ███░░░░░███ ░░███ ░░███  ╠╣
╠╣  ███     ░░░  ████  ████████    ██████     ░███    ░███  ░███  ░███  ╠╣
╠╣ ░███         ░░███ ░░███░░███  ███░░███    ░███████████  ░███  ░███  ╠╣
╠╣ ░███          ░███  ░███ ░███ ░███████     ░███░░░░░███  ░███  ░███  ╠╣
╠╣ ░░███     ███ ░███  ░███ ░███ ░███░░░      ░███    ░███  ░███  ░███  ╠╣
╠╣  ░░█████████  █████ ████ █████░░██████     █████   █████ █████ █████ ╠╣
╠╣   ░░░░░░░░░  ░░░░░ ░░░░ ░░░░░  ░░░░░░     ░░░░░   ░░░░░ ░░░░░ ░░░░░  ╠╣
╠╣                                                                      ╠╣
╠╬╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╦╬╣
╚╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╩╝

\n SISTEMA DE GERENCIAMENTO DE BILHETERIA DE CINEMA\n

    \n ESCOLHA UMA OPÇÃO: \n
  
    1 - RELATÓRIOS
    2 - INSERIR REGISTROS
    3 - REMOVER REGISTROS
    4 - ATUALIZAR REGISTROS
    5 - SAIR \n
  `);
}

export function splashScreen() {
  console.log(`
    \n SISTEMA DE GERENCIAMENTO DE BILHETERIA DE CINEMA\n  
    
    \n TOTAL DE REGISTROS EXISTENTES:

    1 - CLIENTES:
    2 - FILMES:
    3 - INGRESSOS:
    4 - SALAS:
    5 - SESSÕES:

    \n CRIADO POR:
    \n ALANA \n
    \n LUIZ \n
    \n JULIANA\n
    \n JOÃO VICTOR\n
    \n PATRICK\n

    \n DISCIPLINA: BANCO DE DADOS - 2024/2\n
    \n PROFESSOR: HOWARD ROATTI\n
  `);
}

export function menuRelatorios() {
  console.log(`
    1 - Ingressos Vendidos
    2 - Sessões Atuais
    3 - Voltar
    `);
}

export function menuTabelas() {
  console.log(`
    1 - Cliente
    2 - Filme
    3 - Ingresso
    4 - Salas
    5 - Sessao
    6 - Voltar 
  `);
}

export function menuAtualizaCliente() {
  console.log(`
    \n
    1 - CPF
    2 - Nome
    3 - Idade
    7 - Voltar \n
  `);
}

export function menuInserirRegistro() {
  console.log(`
    \nEscolha uma opção para inserir um registro:\n   
    1 - Cliente
    2 - Filme
    3 - Ingresso
    4 - Sessão
    5 - Voltar
    `);
}

export function menuRemoverRegistro() {
  console.log(`
    \nEscolha uma opção para remover um registro:\n   
    1 - Cliente
    2 - Filme
    3 - Sessao
    4 - Voltar
    `);
}

export function menuTabelasAtt() {
  console.log(`
    \n
    1 - Filmes
    2 - Salas
    3 - Sessoes
    4 - Voltar \n
  `);
}
