

const selectElement = document.getElementById('cohorts');
const selectUsers= document.getElementById('users');

getJSON('../data/cohorts.json', (err, json) => {
    if (err) {
        return console.error(err);
    }


    const cohorts = json;


    for (let i = 0; i < cohorts.length; i++) {
        const optionsElements = document.createElement('option');
        const contenidoOptions = document.createTextNode(cohorts[i].id);
        optionsElements.appendChild(contenidoOptions);
        selectElement.appendChild(optionsElements);
        console.log(cohorts[i].id);
    }
});


