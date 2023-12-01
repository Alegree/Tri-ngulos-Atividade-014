function analizarTriangulo() {
  const lado1 = parseFloat(document.getElementById('lado1').value);
  const lado2 = parseFloat(document.getElementById('lado2').value);
  const lado3 = parseFloat(document.getElementById('lado3').value);


  if (isNaN(lado1) || isNaN(lado2) || isNaN(lado3)) {
    document.getElementById('resultado').innerText = 'Por favor, insira números válidos para os lados do triângulo.';
    return;
  }

  if (lado1 <= 0 || lado2 <= 0 || lado3 <= 0) {
    document.getElementById('resultado').innerText = 'Os lados do triângulo devem ser maiores que zero.';
    return;
  }

  if (lado1 + lado2 <= lado3 || lado1 + lado3 <= lado2 || lado2 + lado3 <= lado1) {
    document.getElementById('resultado').innerText = 'Estes lados não formam um triângulo.';
    return;
  }

  let imagem = '';

  let type = '';
  if (lado1 === lado2 && lado2 === lado3) {
    type = 'Equilátero';
    imagem = '/imagens/equilatero.png';
  } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
    type = 'Isósceles';
    imagem = '/imagens/isosceles.png';
  } else {
    type = 'Escaleno';
    imagem = '/imagens/escaleno.png';
  }

  let anguloType = '';
  const angulos = carcularAngulos(lado1, lado2, lado3);

  if (angulos.some(angulos => angulos > 90)) {
  } else if (angulos.some(angulos => angulos === 90)) {
    anguloType = 'Reto';
    imagem = '/imagens/reto.png';
  } else if (angulos.every(angulos => angulos < 90)) {
    anguloType = 'Agudo';
  } else if (angulos.every(angulos => angulos === 90)) {
    anguloType = 'Raso';
  } else {
    anguloType = 'Giro (Volta Inteira)';
  }

  document.getElementById('resultado').innerText = `Tipo de Triângulo: ${type}, Tipo de Ângulo: ${anguloType}`;
  document.getElementById('imagem').src = imagem;
}

function carcularAngulos(lado1, lado2, lado3) {
  const angulos = [];

  angulos.push(
    calculateAngle(lado2, lado3, lado1),
    calculateAngle(lado1, lado3, lado2),
    calculateAngle(lado1, lado2, lado3)
  );

  return angulos;
}

function calculateAngle(a, b, c) {
  return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
}
