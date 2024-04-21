class Paciente {
  constructor(nome, cpf, dataNascimento) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  validarCPF() {
    return /^\d{11}$/.test(this.cpf);
  }

  validarNome() {
    if (this.nome.length <= 4) {
      console.log("O nome deve ter ao menos 5 caracteres");
      return false;
    }
    return true;
  }

  calcularIdade() {
    const dataNascimento = new Date(this.dataNascimento);
    const hoje = new Date();
    const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
    return diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
  }

  validarDataNascimento() {
    const idade = this.calcularIdade();
    return idade >= 18;
  }

  validarIdadeMinima(idadeMinima) {
    const idade = this.calcularIdade();
    return idade >= idadeMinima;
  }
}

export default Paciente;
