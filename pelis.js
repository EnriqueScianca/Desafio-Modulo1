const fs = require("fs");

const datos = fs.readFileSync(__dirname + "/pelis.json");
const datosString = datos.toString();
const pelis = JSON.parse(datosString);

//TODAS LAS PELICULAS
function getAll() {
  return pelis;
}

//ORDENA CON SORT SEGUN EL PARAMETRO QUE LE PASEMOS

function sortBy(propiedad, collectionDePeliculas) {
  const ordenar = collectionDePeliculas.sort(function (a, b) {
    if (a[propiedad] > b[propiedad]) {
      return 1;
    } else if (a[propiedad] < b[propiedad]) {
      return -1;
    }
    return 0;
  });
  return ordenar;
}
// BUSCA LAS PELIS POR EL PARAMETRO QUE LE PASEMOS POR TERMINAL

function searchBy(texto, collectionDePeliculas) {
  const filtro = collectionDePeliculas.filter(function (item) {
    return item.title.toLowerCase().includes(texto.toLowerCase());
  });
  return filtro;
}
//BUSCA POR TAG

function searchByTag(criterio, collectionDePeliculas) {
  const filtradoTags = collectionDePeliculas.filter(function (item) {
    return item.tags.includes(criterio);
  });
  return filtradoTags;
}

//MUESTRA PELIS SIN FORMATO
function noFormat(collectionDePeliculas) {
  return JSON.stringify(collectionDePeliculas);
}

// PROCESADOR DE DATOS
function searchByCriteria(criterios) {
  let todas = getAll();

  if (criterios.search) {
    todas = searchBy(criterios.search, todas);
    // criterios.search se refiere al valor que le asignemos a search en el parse.argv
  }

  if (criterios.tag) {
    todas = searchByTag(criterios.tag, todas);
  }

  if (criterios.sort) {
    todas = sortBy(criterios.sort, todas); //El criterios.sort se refiere al valor que tiene sort
  }

  if (criterios.hasOwnProperty("no-format")) {
    todas = noFormat(todas);
  }
  // console.log("Soy el console.log criterios... ", criterios.sort);
  return todas;
}

exports.searchByCriteria = searchByCriteria;
