//Llamando a los elmentos del HTML que se van a manipular
const selectCohorts = document.getElementById('cohorts');
const selectUsers = document.getElementById('users');
const showGlobal = document.getElementById('progress');
const sedesArr = ['Arequipa', 'Lima', 'México', 'Chile'];
const buttonMenu = document.getElementById('button-menu');
const menu = document.getElementById('content-menu');
const submenu = document.getElementsByClassName('submenu');
const ulElement1 = document.getElementById('items-sedes');
const ulElement2 = document.getElementById('items-cohorts');

//Trayendo todos los archivos con su data
let cohort = []
let users = []
let progress = []

const jsonCohort = fetch('../data/cohorts.json')
  .then(response => response.json())
const jsonUser = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
const jsonUserProgress = fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  .then(response => response.json())
Promise.all([jsonCohort, jsonUser, jsonUserProgress])
  .then(data => {
    cohort = data[0];
    users = data[1]
    progress = data[2]
    //console.log(data[0], data[1], data[2]);
  })
  .catch((err) => {
    console.error('Error happened' + err);
  });

//Creando función para mostrar y ocultar el menú contenedor
const showMenu = () => {
  if (menu.classList.contains('disabled')) {
    menu.classList.remove('disabled');
    menu.classList.add('enabled');
  } else {
    menu.classList.remove('enabled');
    menu.classList.add('disabled');
  }
};
buttonMenu.addEventListener('click', showMenu);

//Creando función para mostrar y ocultar el submenú
function showSubMenu() {
  let subMenu = this.getElementsByClassName('items')[0];
  console.log(subMenu);
  if (subMenu.classList.contains('hide')) {
    subMenu.classList.remove('hide');
    subMenu.classList.add('show');
  } else {
    subMenu.classList.remove('show');
    subMenu.classList.add('hide');
    console.log(subMenu);
  }
}; for (let i = 0; i < submenu.length; i++) {
  submenu[i].addEventListener('click', showSubMenu);
};

//Creando nodos del DOM: Lista de sedes
sedesArr.forEach((element, i) => {
  const listSedes = document.createElement("li");
  listSedes.textContent = sedesArr[i];
  listSedes.id = sedesArr[i];
  ulElement1.appendChild(listSedes);
  listSedes.addEventListener('click', (e) => {
    console.log(e.target);
  })
});

//Función para traer la data de cohorts de Lima
const cohortsLima = () => {
  cohort.forEach((element, i) => {
    const listCohorts = document.createElement('li');
    if (cohort[i].id.substring(0, 3) === "lim") {
      listCohorts.textContent = cohort[i].id;
      listCohorts.id = cohort[i].id;
      listCohorts.setAttribute("href", cohort[i].id);
      ulElement2.appendChild(listCohorts);
      listCohorts.addEventListener('click', (e) => {
        console.log(e.target);
        /*         if (e.target.getAttribute("lim-2018-03-pre-core-pw")) {
                  console.log("Hola Meli, entraste al cohort de lima 2018"); */
      })
    }
  });
}
selectCohorts.addEventListener('click', cohortsLima);

showGlobal.addEventListener('click', () => {
  //Creando objeto options y definiendo sus valores.
  let options = {
    cohort: cohort,
    cohortData: {
      users: users,
      progress: progress
    },
/*     orderBy: 'name',
    orderDirection: 'Ascendente',
    search: '' */
  };
  //Llamando a la función processCohortData, y enviando como parametro el objeto options. 
  //Esto retornará una lista de usuarios con stats, lo cual se almacena en una variable.
  let usersWithStats = processCohortData(options);
  console.log(usersWithStats);
});

