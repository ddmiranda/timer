var hash = window.location.search.substr(1);
var inicio = Date.now()
var inicioFracao = Date.now()
var timer = hash ? parseInt(hash) * 60000 : 3600000
var umDecimo = timer / 10
var umCentesimo = timer / 110
var tempoDecorrido = Date.now() - inicio

if (window.console) {
  console.log('Hello Service Worker caching!');
}

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
  return quantidade * fracao + tempo;
}

var intervalo;
noSleep.enable();

function atualizar() {
  var tempo1 = desabilitar("a", inicio, umDecimo)
  desabilitar("b", tempo1, umCentesimo)
  if ((Date.now() - inicio - 200) > timer) {
    habilitarTudo()
    ligar()
    noSleep.disable();
    window.setTimeout(function () { window.clearInterval(intervalo) }, 1)
  }
}

intervalo = window.setInterval(function () {
  atualizar()
}, umCentesimo)
