export default class Validacao {
  
  //elemento selecionado CPF
  constructor(element) {
    this.element = element;
  }

  //método para limpar cpf
  clean(cpf){
    return cpf.replace(/\D/g, ''); //regex que remove tudo que não for digito e espaços
  }

  //método para organizar o cpf
  arrange(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'); //regex de organização do cfp (adiciona '.' e '-' nos lugares padrão)
  }

  //método para formatar o CPF
  format(cpf) {
    const cpfLimpo = this.clean(cpf);
    return this.arrange(cpfLimpo);
  }

  //método de validação do cpf
  validate(cpf) {
    const matchCPF = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g); //regex de validação do cpf
    return (matchCPF && matchCPF[0] === cpf); //valida se o cpf que foi digitado é igual ao cpf que consta na array na posição 0
                                              //matchCPF está sendo testado para caso o cpf colocado pelo usuário seja menor que o número de dados necessários na array
  }

  //método para validar a mudança quando ela acontecer
  validOnChange(cpfElement) {
    if(this.validate(cpfElement.value)){ 
      cpfElement.value = this.format(cpfElement.value); //se o valor for verdadeiro no 'validate', ele será formatado e organizado
      cpfElement.classList.add('valid'); //adiciona uma borda verde se o valor for verdadeiro
      cpfElement.classList.remove('error'); //remove o erro caso o usuário acerte os valores
      cpfElement.nextElementSibling.classList.remove('active');
    } else {
      cpfElement.classList.add('error'); //se o valor for falso, aparecerá uma borda vermelha no input, sinalizando o erro
      cpfElement.classList.remove('valid'); //remove o acerto caso o usuário erre os valores
      cpfElement.nextElementSibling.classList.add('active');
    }
  }

  //evento de mudança quando a pessoa validar
  changeEvent() {
    this.element.addEventListener('change', () => {
      this.validOnChange(this.element); //o 'this.element' é na verdade o 'cpfElement'
    })
  }

  //mensagem que aparece durante o erro
  addSpanError () {
    const erroElement = document.createElement('span');
    erroElement.classList.add('error-text');
    erroElement.innerText = 'CPF Inválido';
    this.element.parentElement.insertBefore(erroElement, this.element.nextElementSibling);
  }

  //ativação do método
  init() {
    this.changeEvent();
    this.addSpanError();
    return this;
  }
}