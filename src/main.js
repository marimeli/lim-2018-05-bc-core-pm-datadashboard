//Llamando a los elmentos del HTML que se van a manipular
const selectCohorts = document.getElementById('cohorts');
const selectUsers = document.getElementById('users');
const buttonGlobal = document.getElementById('global');
const sedesArr = ['Arequipa', 'Lima', 'México', 'Chile'];
const buttonMenu = document.getElementById('button-menu');
const menu = document.getElementById('content-menu');
const submenu = document.getElementsByClassName('submenu');
const ulElement1 = document.getElementById('items-sedes');
const ulElement2 = document.getElementById('items-cohorts');

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

//Haciendo un promise all para traer todos los archivos
let selectedCohortData = [];
let usersData = []
let userProgressData = []

const jsonCohort = fetch('../data/cohorts.json')
  .then(response => response.json())
const jsonUser = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
const jsonUserProgress = fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  .then(response => response.json())
Promise.all([jsonCohort, jsonUser, jsonUserProgress])
  .then(data => {
    selectedCohortData = data[0];
    usersData = data[1]
    userProgressData = data[2]
    console.log(data[0], data[1], data[2]);
  })
  .catch((err) => {
    console.error('Error happened' + err);
  });

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
  selectedCohortData.forEach((element, i) => {
    const listCohorts = document.createElement('li');
    if (selectedCohortData[i].id.substring(0, 3) === "lim") {
      listCohorts.textContent = selectedCohortData[i].id;
      listCohorts.id = selectedCohortData[i].id;
      listCohorts.setAttribute("href", selectedCohortData[i].id);
      ulElement2.appendChild(listCohorts);
      listCohorts.addEventListener('click', (e) => {
        console.log("entré a lima cohort 2018");
      })
    }
  });
}
selectCohorts.addEventListener('click', cohortsLima);

