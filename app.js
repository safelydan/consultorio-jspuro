const readline = require('readline');
const PacienteController = require('./PacientesController');
const ConsultasController = require('./ConsultaController');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pacienteController = new PacienteController();
const consultasController = new ConsultasController();

function cadastrarPaciente() {
    rl.question("Nome do paciente: ", nome => {
        rl.question("CPF do paciente: ", cpf => {
            rl.question("Data de Nascimento do paciente (DD/MM/AAAA): ", dataNascimento => {
                pacienteController.adicionarPaciente(nome, cpf, dataNascimento);
                menuPrincipal();
            });
        });
    });
}

function listarPacientes() {
    pacienteController.listarPacientes();
    menuPrincipal();
}

function agendarConsulta() {
    rl.question("CPF do paciente: ", cpf => {
        const paciente = pacienteController.listaPacientes.find(p => p.cpf === cpf);
        if (paciente) {
            rl.question("Data da consulta (DD/MM/AAAA): ", data => {
                rl.question("Hora inicial da consulta (HH:MM): ", horaInicial => {
                    rl.question("Hora final da consulta (HH:MM): ", horaFinal => {
                        consultasController.agendarConsulta(paciente, data, horaInicial, horaFinal);
                        menuPrincipal();
                    });
                });
            });
        } else {
            console.log(`Paciente com CPF ${cpf} não encontrado.`);
            menuPrincipal();
        }
    });
}

function listarConsultas() {
    consultasController.listarConsultas();
    menuPrincipal();
}

function menuPrincipal() {
    console.log("\n### Menu Principal ###");
    console.log("1. Cadastrar Paciente");
    console.log("2. Listar Pacientes");
    console.log("3. Agendar Consulta");
    console.log("4. Listar Consultas");
    console.log("5. Sair");
    rl.question("Escolha uma opção: ", opcao => {
        switch (opcao) {
            case '1':
                cadastrarPaciente();
                break;
            case '2':
                listarPacientes();
                break;
            case '3':
                agendarConsulta();
                break;
            case '4':
                listarConsultas();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                menuPrincipal();
        }
    });
}

menuPrincipal();
