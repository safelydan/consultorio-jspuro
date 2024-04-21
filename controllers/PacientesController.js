import Paciente from '../models/Paciente.js';
import inquirer from 'inquirer';

class PacienteController {
    constructor() {
        this.listaPacientes = [];
    }

    adicionarPaciente(nome, cpf, dataNascimento) {
        const novoPaciente = new Paciente(nome, cpf, dataNascimento);
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
    const respostas = await inquirer.prompt([
        {type: "input",
        name: "cpf",
        message: "CPF: "
    },
    {type: "input",
        name: "nome",
        message: "Nome"
    },
    {type: "input",
        name: "dataNascimento",
        message: "Data de nascimento: "
    },
    ]);
    
    const {nome, cpf, dataNascimento} = respostas;
    const pacienteController = controller;
    const novoPaciente = new Paciente(nome, cpf, dataNascimento);
    pacienteController.adicionarPaciente(novoPaciente);
}


export default PacienteController;
