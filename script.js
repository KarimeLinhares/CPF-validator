import Validacao from './validacao.js';

const cpf = document.querySelector("#cpf");
const validacao = new Validacao(cpf).init();
