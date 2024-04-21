import Paciente from '../models/Paciente.js';
import { cadastrarPaciente } from '../view/menusIntermediarios.js';

class PacienteController {
    constructor() {
        this.listaPacientes = [];
    }

    adicionarPaciente(nome, cpf, dataNascimento) {
        const novoPaciente = new Paciente(nome, cpf, dataNascimento);
        
        if(!novoPaciente.validarNome(nome)){
            console.log("O nome deve ter ao menos 5 caracteres")
            return false
        }

        if(!novoPaciente.validarCPF(cpf)){
            console.log("CPF inválido. Por favor digite corretamente")
            return false
        }

        if(!novoPaciente.validarIdadeMinima(13)){
            console.log("Erro: o paciente deve ter pelo menos 13 anos.")
            return false
        }
  
        this.listaPacientes.push(novoPaciente);
        console.log(`Paciente ${nome} adicionado.`);
    }

    listarPacientes() {
        console.log("Lista de Pacientes:");
        this.listaPacientes.forEach(paciente => {
            console.log(`Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`);
        });
    }
}

export async function criarPacienteInterativo(controller){
    
    const {nome, cpf, dataNascimento} = cadastrarPaciente.respostas;
    const pacienteController = controller;
    const novoPaciente = new Paciente(nome, cpf, dataNascimento);
    pacienteController.adicionarPaciente(novoPaciente);
}


export default PacienteController;
