import { createInterface } from "readline";
import inquirer from "inquirer";
import { menuCadastro, menuAgenda } from "./view/menusIntermediarios.js";
import { mainMenu } from "./view/menuPrincipal.js";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

mainMenu()
