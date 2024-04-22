import Consulta from "../models/Consulta.js";

class ConsultasController {
  constructor() {
    this.listaConsultas = [];
  }

  agendarConsulta(paciente, data, horaInicial, horaFinal) {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();

    // Convertendo a string da data para objetos de data
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataConsulta = new Date(ano, mes - 1, dia);

    const horaInicialInt = parseInt(horaInicial.replace(':', ''));
    if(dataConsulta < dataAtual || (dataConsulta.getTime() === dataAtual.getTime() && horaInicialInt <= horaAtual)){
      console.log("Não é possível agendar uma consulta no passado ou no presente.");
      return;
    }

    if(parseInt(horaFinal.replace(':', '')) <= horaInicialInt){
      console.log("A hora final deve ser posterior à hora inicial");
      return;
    }

    const consultaExistente = this.listaConsultas.find(consulta => 
        consulta.paciente.nome === paciente.nome && new Date(consulta.data) > dataAtual
      )
    
    if(consultaExistente){
      console.log("Este paciente já tem uma consulta futura agendada.");
      return;
    }

    const horaFinalInt = parseInt(horaFinal.replace(':', ''));
    const novaConsultaHorarios = Array.from({
      length: (horaFinalInt - horaInicialInt) / 15 + 1
    }, (_, i) => {
      horaInicialInt + i * 15
    })
    
    const sobreposicao = this.listaConsultas.some(consulta => {
      const consultaHorarios = Array.from({ length: (parseInt(consulta.horaFinal.replace(':', '')) - parseInt(consulta.horaInicial.replace(':', ''))) / 15 + 1 }, (_, i) =>
        parseInt(consulta.horaInicial.replace(':', '')) + i * 15
      );
      return consulta.data === data && consultaHorarios.some(h => novaConsultaHorarios.includes(h));
    });
    if (sobreposicao) {
      console.log("Há uma sobreposição de horários com outra consulta.");
      return;
    }

    const horaRegex = /^(0[8-9]|1[0-8]):(00|15|30|45)$/;
    if (!horaRegex.test(horaInicial) || !horaRegex.test(horaFinal)) {
      console.log("As horas inicial e final devem ser definidas sempre de 15 em 15 minutos.");
      return;
    }

    if (horaInicialInt < 800 || horaFinalInt > 1900) {
      console.log("O horário de agendamento está fora do horário de funcionamento do consultório.");
      return;
    }

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
