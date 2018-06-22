

const selectElement = document.getElementById('cohorts');
const selectUsers= document.getElementById('users');
const buttonGlobal = document.getElementById('global');

buttonGlobal.addEventListener('click', () => {
    document.getElementById('main').style.display="block";
    document.getElementById("filters").style.display = "none";
});


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


