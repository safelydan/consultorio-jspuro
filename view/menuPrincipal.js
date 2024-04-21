import inquirer from "inquirer";
import { menuAgenda, menuCadastro } from "./menusIntermediarios.js";
export async function mainMenu() {
  const resposta = await inquirer.prompt({
    type: "list",
    name: "opcao",
    message: "Escolha uma opção",
    choices: ["1-Cadastro de pacientes", "2-Agenda", "3-Fim"],
  });
  switch (resposta.opcao) {
    case "1-Cadastro de pacientes":
      menuCadastro();
      break;
    case "2-Agenda":
      menuAgenda();
      break;
    case "3-Fim":
      console.log("Encerrando o programa...");
      return;
  }
}
