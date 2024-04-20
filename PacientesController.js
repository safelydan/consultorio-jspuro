const Paciente = require('./Paciente');

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

module.exports = PacienteController;
