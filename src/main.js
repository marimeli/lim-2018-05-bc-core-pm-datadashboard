//Llamando a los elmentos del HTML que se van a manipular
const buttonMenu = document.getElementById('button-menu');
const submenu = document.getElementsByClassName('submenu');
const ulElement1 = document.getElementById('items-sedes');
const ulElement2 = document.getElementById('items-cohorts');
const sedesArr = ['Lima', 'Arequipa', 'México', 'Chile'];
const sedesList = sedesArr;
const selectCohorts = document.getElementById('cohorts');
const selectUsers = document.getElementById('users');
const buttonGlobal = document.getElementById('global');

//Creando función para mostrar el menú contenedor
const showMenu = () => {
    let menu = document.getElementById('content-menu');

    if(menu.classList.contains('disabled')){
        menu.classList.remove('disabled');
        menu.classList.add('enabled');
    } else {
        menu.classList.remove('enabled');
        menu.classList.add('disabled');
    }
};

//Agregando eventos del DOM: Botón menú
buttonMenu.addEventListener('click', showMenu);

//Creando nodos del DOM para tener un submenú
let list1 = document.createElement("li");
for (let i = 0; i < 4; i++) {
  let liElement = document.createElement("li");
  liElement.innerHTML = sedesList[i];
  list1.appendChild(liElement)
};
ulElement1.appendChild(list1);

//Creando función para mostrar el submenú
function showSubMenu () {
    let subMenu = this.getElementsByClassName('items')[0];
    console.log(subMenu);
    if(subMenu.classList.contains('hide')){
        subMenu.classList.remove('hide');
        subMenu.classList.add('show');
    } else {
        subMenu.classList.remove('show');
        subMenu.classList.add('hide');
        console.log(subMenu);
    }         
};

//Agregando eventos del DOM: Botón submenú
for (let i = 0; i < submenu.length; i++) {
  submenu[i].addEventListener('click', showSubMenu);
};

//Haciendo petición asíncrona usando Fetch
const getJson = () => {
  fetch('../data/cohorts.json')
    .then(response => { return response.json() })
    .then(data => {
      dataCohorts(data)
    })
    .catch((err) => {
      console.error("Error happened" + err);
    });
<<<<<<< HEAD
}

//Función para traer data de los cohorts
const dataCohorts = (json) => {
  let cohorts = json;
  let list2 = document.createElement("li");
  for (let i = 0; i < cohorts.length; i++) {
    const listCohorts = document.createElement('li');
    listCohorts.textContent = cohorts[i].id;
    console.log(listCohorts);
    ulElement2.appendChild(listCohorts);
  }
};
selectCohorts.addEventListener('click', getJson);

const jsonCohort = fetch('../data/cohorts.json')
  .then(response => response.json())
const jsonUser = fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then(response => response.json())
const jsonUserProgress = fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  .then(response => response.json())
Promise.all([jsonCohort, jsonUser, jsonUserProgress])
.then(data => {
  const selectedCohortData =  data [0];
  const usersData = data [1]
  const userProgressData = data[2]
  console.log(data[0], data[1],data[2]);
  })
=======
});

>>>>>>> 395bea8d3f32e45904fb4f300a59a838739b6132
