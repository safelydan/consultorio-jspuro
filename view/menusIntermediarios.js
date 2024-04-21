import inquirer from "inquirer";
import PacienteController from "../controllers/PacientesController.js";
import ConsultasController from "../controllers/ConsultaController.js";
import { mainMenu } from "./menuPrincipal.js";

const pacienteController = new PacienteController();
const consultasController = new ConsultasController();

export async function menuCadastro() {
  const resposta = await inquirer.prompt({
    type: "list",
    name: "opcao",
    message: "Escolha uma opção",
    choices: [
      "1-Cadastrar novo paciente",
      "2-Excluir paciente",
      "3-Listar pacientes (ordenado por CPF)",
      "4-Listar pacientes (ordenado por Nome)",
      "5-Voltar p/ menu principal",
    ],
  });

  switch (resposta.opcao) {
    case "1-Cadastrar novo paciente":
      cadastrarPaciente();
      break;
    case "2-Excluir paciente":
      await excluirPaciente();
      break;
    case "3-Listar pacientes (ordenado por CPF)":
      listarPacientes();
      break;
    case "4-Listar pacientes (ordenado por Nome)":
      listarPacientes();
      break;
    case "5-Voltar p/ menu principal":
      return;
    default:
      console.log("Opção inválida. Tente novamente.");
  }
}

export function cadastrarPaciente() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "nome",
        message: "Nome do paciente: ",
        validate: function (nome) {
          if (nome.trim().length <= 4) {
            return "O nome deve ter ao menos 5 caracteres";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "cpf",
        message: "CPF do paciente: ",
        validate: function (cpf) {
          if (!/^\d{11}$/.test(cpf)) {
            return "CPF inválido. Por favor digite corretamente";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "dataNascimento",
        message: "Data de Nascimento do paciente (DD/MM/AAAA): ",
        validate: function(dataNascimento){
            if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento))) {
                return "Data de nascimento no formato inválido. Por favor, digite no formato: DD/MM/AAAA";
            }
            return true;
        }
    }
    ])
    .then((respostas) => {
      const { nome, cpf, dataNascimento } = respostas;
      pacienteController.adicionarPaciente(nome, cpf, dataNascimento);
      mainMenu();
    });
}

export async function excluirPaciente(){
  const resposta = await inquirer.prompt({
    type: "input",
    name: "cpf",
    message: "Digite o CPF do paciente que deseja excluir: ", 
    validate: function (cpf) {
      if (!/^\d{11}$/.test(cpf)) {
        return "CPF inválido. Por favor digite corretamente";
      }
      return true;
    },
  })
  const {cpf: cpfParaExcluir} = resposta;
  if(pacienteController.excluirPaciente(cpfParaExcluir)){
    console.log('Paciente excluido com sucesso')
  }else{
    console.log("Paciente nao encontrado")
  }
  mainMenu()
} 

function listarPacientes() {
  pacienteController.listarPacientes();
  mainMenu();
}

export async function menuAgenda() {
  const resposta = await inquirer.prompt({
    type: "list",
    name: "opcao",
    message: "Escolha uma opção:",
    choices: [
      "1-Agendar consulta",
      "2-Cancelar agendamento",
      "3-Listar agenda",
      "4-Voltar p/ menu principal",
    ],
  });
  switch (resposta.opcao) {
    case "1-Agendar consulta":
      agendarConsulta();
      break;
    case "2-Cancelar agendamento":
      cancelarAgendamento();
      break;
    case "3-Listar agenda":
      listarConsultas();
      break;
    case "4-Voltar p/ menu principal":
      return;
  }
}

function agendarConsulta() {
  inquirer
    .prompt([{ type: "input", name: "cpf", message: "CPF do paciente: " }])
    .then((respostas) => {
      const paciente = pacienteController.listaPacientes.find(
        (p) => p.cpf === respostas.cpf
      );
      if (paciente) {
        inquirer
          .prompt([
            {
              type: "input",
              name: "data",
              message: "Data da consulta (DD/MM/AAAA): ",
            },
            {
              type: "input",
              name: "horaInicial",
              message: "Hora inicial da consulta (HH:MM): ",
            },
            {
              type: "input",
              name: "horaFinal",
              message: "Hora final da consulta (HH:MM): ",
            },
          ])
          .then((respostas) => {
            const { data, horaInicial, horaFinal } = respostas;
            consultasController.agendarConsulta(
              paciente,
              data,
              horaInicial,
              horaFinal
            );
            mainMenu();
          });
      } else {
        console.log(`Paciente com CPF ${respostas.cpf} não encontrado.`);
        mainMenu();
      }
    });
}

function listarConsultas() {
  consultasController.listarConsultas();
  mainMenu();
}
