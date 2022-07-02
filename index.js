const pelis = require("./pelis");

function parsearARGV(argv) {
  // DENTRO DE RESPUESTA TENGO LA KEY Y EL VALOR QUE PASO POR CONSOLA

  const respuesta = {};

  argv.forEach(function (item, ind) {
    if (item.startsWith("--")) {
      const sinGuiones = item.slice(2);
      respuesta[sinGuiones] = argv[ind + 1];
    }
  });
  return respuesta;
}

function main() {
  const input = parsearARGV(process.argv);
  console.table(pelis.searchByCriteria(input));
}

main();
