const selectElement = document.getElementById('sedes');

getJSON('../data/cohorts.json', (err, json) => {
  if (err) {
    // algo salió mal...
    return console.error(err);
  }

  const sedes = json;
  console.log(sedes);
  console.log(sedes.length);

  for (let i = 0; i < sedes.length; i++) {
    const optionsElements = document.createElement('option');
    const contenidoOptions = document.createTextNode(sedes[i].id);
    optionsElements.appendChild(contenidoOptions);
    selectElement.appendChild(optionsElements);
    // console.log(sedes[i].id);
  }

});
