window.addEventListener('load', start);

const form = document.getElementById('form');

function start() {
  form.addEventListener('submit', handleSubmit);
}

class Speed {
  constructor(via, veiculo) {
    this.velocidadeMedia = via / veiculo;
    this.multa = this.multa();
    this.pontuacao = this.pontuacao();
  }

  multa() {
    switch (!!this.velocidadeMedia) {
      case this.velocidadeMedia >= 0.93:
        return 88.38;
      case this.velocidadeMedia >= 0.8:
        return 130.16;
      case this.velocidadeMedia >= 0.5:
        return 195.23;
      default:
        return 293.47;
    }
  }

  pontuacao() {
    switch (!!this.velocidadeMedia) {
      case this.velocidadeMedia >= 0.93:
        return 3;
      case this.velocidadeMedia >= 0.8:
        return 4;
      case this.velocidadeMedia >= 0.5:
        return 5;
      default:
        return 7;
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const via = document.getElementById('via').value;
  const veiculo = document.getElementById('veiculo').value;

  const velocidadeMedia = Number(via) / Number(veiculo);

  if (velocidadeMedia >= 1) {
    alert('Condutor dentro da velocidade permitida.');
    return;
  }

  const infracaoData = new Speed(via, veiculo);

  handleInfo(infracaoData);
}

function handleInfo(data) {
  const info = document.getElementById('info');

  const pontuacao = document.getElementById('pontuacaoInfo');
  pontuacao.textContent = data.pontuacao;
  const multa = document.getElementById('multaInfo');
  multa.textContent = data.multa;

  info.classList.remove('isHidden');

  const regularizar = document.getElementById('regularizar');
  regularizar.classList.remove('isHidden');
  regularizar.addEventListener('click', () => handleRegularization(data));

  const consultar = document.getElementById('consultar');
  consultar.value = 'Nova consulta';
}

function handleRegularization(data) {
  const infracao = document.getElementById('infracao');
  infracao.classList.remove('isHidden');
  infracao.classList.add('isShown');

  form.classList.add('isHidden');

  const pontuacaoText = document.getElementById('pontuacaoText');
  pontuacaoText.value = data.pontuacao;

  const multaText = document.getElementById('multaText');
  multaText.value = data.multa;

  const printButton = document.getElementById('printButton');
  printButton.addEventListener('click', () => {
    window.print();
    location.reload();
  });
}
