import Paciente from "../models/Paciente.js";
import {
  cadastrarPaciente,
  excluirPaciente,
} from "../view/menusIntermediarios.js";

class PacienteController {
  constructor() {
    this.listaPacientes = [];
  }

  adicionarPaciente(nome, cpf, dataNascimento) {
    const novoPaciente = new Paciente(nome, cpf, dataNascimento);

    const cpfExistente = this.listaPacientes.find(
      (paciente) => paciente.cpf === cpf
    );

    if (cpfExistente) {
      console.log("CPF já cadastrado. Não é possível adicionar o paciente.");
      return false;
    }

    if (!novoPaciente.validarNome(nome)) {
      console.log("O nome deve ter ao menos 5 caracteres");
      return false;
    }

    if (!novoPaciente.validarCPF(cpf)) {
      console.log("CPF inválido. Por favor digite corretamente");
      return false;
    }

    if (!novoPaciente.validarIdadeMinima(13)) {
      console.log("Erro: o paciente deve ter pelo menos 13 anos.");
      return false;
    }

    this.listaPacientes.push(novoPaciente);
    console.log(`Paciente ${nome} adicionado.`);
  }

  listarPacientes() {
    console.log("Lista de Pacientes:");
    this.listaPacientes.forEach((paciente) => {
      console.log(
        `Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`
      );
    });
  }

  listarPacientesPorCPF() {
    console.log("Lista de pacientes ordenada por CPF:");

    const ordenacao = this.listaPacientes.slice().sort((a, b) => {
      return a.cpf.localeCompare(b.cpf);
    });
    ordenacao.forEach((paciente) => {
      console.log(
        `Nome: ${paciente.nome} CPF: ${paciente.cpf} Data de Nascimento ${paciente.dataNascimento}`
      );
    });
  }
  listarPacientesPorNome() {
    console.log("Lista de pacientes ordenada por nome:");

    const ordenacao = this.listaPacientes.slice().sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
    ordenacao.forEach((paciente) => {
      console.log(
        `Nome: ${paciente.nome} CPF: ${paciente.cpf} Data de Nascimento ${paciente.dataNascimento}`
      );
    });
  }

  excluirPaciente(cpf) {
    const indice = this.listaPacientes.findIndex(
      (paciente) => paciente.cpf === cpf
    );
    if (indice !== -1) {
      this.listaPacientes.splice(indice, 1);
      return true;
    } else {
      return false;
    }
  }
}

export async function criarPacienteInterativo(controller) {
  const { nome, cpf, dataNascimento } = cadastrarPaciente.respostas;
  const pacienteController = controller;
  const novoPaciente = new Paciente(nome, cpf, dataNascimento);
  pacienteController.adicionarPaciente(novoPaciente);
}

export default PacienteController;
