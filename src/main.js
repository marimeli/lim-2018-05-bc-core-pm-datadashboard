

const selectElement = document.getElementById('cohorts');

getJSON('../data/cohorts.json', (err, json) => {
    if (err) {
        // algo salió mal...
        return console.error(err);
    }


    const cohorts = json;
    console.log(cohorts);
    console.log(cohorts.length);


    for (let i = 0; i < cohorts.length; i++) {
        const optionsElements = document.createElement('option');
        const contenidoOptions = document.createTextNode('hola');
        optionsElements.appendChild(contenidoOptions);
        selectElement.appendChild(optionsElements);
        console.log(cohorts[i].id);
    }
});


