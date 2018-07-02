var hash = window.location.search.substr(1);
console.log(hash)
var inicio = hash ? parseInt(hash) : Date.now()
var inicioFracao = Date.now()
var timer = 360000
var umDecimo = timer / 10
var umCentesimo = timer / 110

function habilitar(nivel) {
  for (var i = 1; i <= 10; i++) {
    var elemento = document.getElementById(nivel + i)
    if (elemento) {
      elemento.className = "enable"
    }
  }
}

function ligar() {
  var elemento = document.body
  if (elemento) {
    //elemento.className = "ligado"
  }

  elemento = document.getElementById("container")
  if (elemento) {
    elemento.className = "ligado"
  }
}

function habilitarTudo() {
  habilitar('a')
  habilitar('b')
}


function desabilitar(nivel, tempo, fracao) {
  habilitar(nivel)
  var decorrido = Date.now() - tempo
  var quantidade = Math.trunc(decorrido / fracao)
  for (var i = 1; i <= quantidade; i++) {
    var elemento = document.getElementById(nivel + i)
    if (elemento) {
      elemento.className = "disable"
    }
  }
  console.log('tempo: ' + quantidade + " - " + fracao + " - " + tempo)
  return (quantidade * fracao) + tempo;
}

var intervalo;

function atualizar() {
  var tempo1 = desabilitar("a", inicio, umDecimo)
  console.log('tempo1: ' + tempo1)
  desabilitar("b", tempo1, umCentesimo)
  if ((Date.now() - inicio - 200) > timer) {
    habilitarTudo()
    ligar()
    window.setTimeout(function(){window.clearInterval(intervalo)}, 1)
  }
}

atualizar();

window.setTimeout(function(){
  window.location.href = '/timer/?' + inicio
  window.setTimeout(window.stop, 0)
}, umCentesimo)

// intervalo = window.setInterval(function () {
//  atualizar()
// }, umCentesimo)
