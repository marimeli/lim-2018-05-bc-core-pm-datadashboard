

const selectElement = document.getElementById('cohorts');
const selectUsers= document.getElementById('users');

getJSON('../data/cohorts.json', (err, json) => {
    if (err) {
        return console.error(err);
    }
<<<<<<< HEAD


=======
>>>>>>> b188a7024efb0b9f2d10fefd00d146be23339130
    const cohorts = json;


    for (let i = 0; i < cohorts.length; i++) {
        const optionsElements = document.createElement('option');
        const contenidoOptions = document.createTextNode('hola');
        optionsElements.appendChild(contenidoOptions);
        selectElement.appendChild(optionsElements);
        console.log(cohorts[i].id);
    }
});


<<<<<<< HEAD
=======
getJSON('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, json) => {
    if (err) {
        return console.error(err);
    }
    const users = json;
    for (let i = 0; i < users.length; i++) {
        optionsElements = document.createElement('option');
        contenidoOptions = document.createTextNode(users[i].name);
        optionsElements.appendChild(contenidoOptions);
        selectUsers.appendChild(optionsElements);
        console.log(users[i].name); 
        }

    getJSON('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, json) => {
        if (err) {
            return console.error(err);
        }
        const usersProgress = json;

        console.log(users, usersProgress)
    });
});
>>>>>>> b188a7024efb0b9f2d10fefd00d146be23339130
