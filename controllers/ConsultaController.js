import Consulta from "../models/Consulta.js";

class ConsultasController {
  constructor() {
    this.listaConsultas = [];
  }

  agendarConsulta(paciente, data, horaInicial, horaFinal) {
    const novaConsulta = new Consulta(paciente, data, horaInicial, horaFinal);
    this.listaConsultas.push(novaConsulta);
    console.log(
      `Consulta agendada para ${paciente.nome} no dia ${data}, das ${horaInicial} às ${horaFinal}.`
    );
  }

  listarConsultas() {
    console.log("Lista de Consultas Agendadas:");
    this.listaConsultas.forEach((consulta) => {
      console.log(
        `Paciente: ${consulta.paciente.nome}, Data: ${consulta.data}, Hora Inicial: ${consulta.horaInicial}, Hora Final: ${consulta.horaFinal}`
      );
    });
  }
}

export default ConsultasController;
