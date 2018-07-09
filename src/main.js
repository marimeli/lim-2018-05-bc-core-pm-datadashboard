//Almacenando las variables para la selección de DOM
const menuButton = document.querySelector('.menu-button')
const submenu = document.getElementsByClassName('submenu');
const campusesArr = ['aqp', 'cdmx', 'gdl', 'lim', 'scl', 'spl'];
const listCampus = document.getElementById('items-campuses');
const listCohort = document.getElementById('items-cohorts');
const sectionMain = document.querySelector('#main-content');
const campuses = document.getElementById('campuses');
const cohorts = document.getElementById('cohorts');
const optionsList = document.getElementById('options-list');
const optionsArr = ['perfil', 'configuración', 'cerrar sesión'];
const userName = document.getElementById('user-name');
let errorCase = null;
let campusSection = null;
let sectionCohort = null;
let sectionProfile = null;
let sectionSignOut = null;

//Creando objeto options y definiendo sus valores.
const options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null
  },
  orderBy: 'name',
  orderDirection: 'Ascendente',
  search: ''
};

//Función para mostrar y ocultar el menú
const showSidebar = () => {
  document.body.classList.toggle('sidebar-active');
};
menuButton.addEventListener('click', showSidebar);

//Función para mostrar y ocultar el submenú

//Función para hacer las peticiones AJAX, usando el método GET
const getData = (str, url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('load', event => {
    if (event.target.readyState === 4) {
      if (event.target.status !== 200) {
        return console.error(new Error(`HTTP error: ${event.target.status}`));
      } else {
        const response = JSON.parse(event.target.responseText);
        callback(str, response);
      }
    }
  })
  xhr.send();
};

//Función para mostrar la lista de cohorts ya filtrado, según la sede seleccionada 2
const showCohorts = (id, cohortsArr) => {
  //console.log(id, arrCohorts);
  const cohortsByCampus = cohortsArr.filter(objCohort => {
    return objCohort.id.indexOf(id) !== -1;
  })
  //console.log(cohortsByCampus);
  let content = '';
  cohortsByCampus.forEach((cohort) => {
    content += `<li id='${cohort.id}' class='listC'>${cohort.id}</li>`
  })
  listCohort.innerHTML = content;
};

//Función para mostrar el progreso de las estudiantes 8
const showProgress = (idCohort, objProgress) => {
  console.log(idCohort, objProgress); //lim-2018-03-pre-core-pw, objeto de progreso
  options.cohortData.progress = objProgress;
  console.log(options);
  //processCohortData(options)
 let usersWithStats = processCohortData(options);
  console.log(usersWithStats); 
   let progressTable = '';
  usersWithStats.forEach((user, i) => {
    let listUser = document.createElement('li');
    progressTable += `<li> Alumna: ${options.cohortData.users[i].name} <br> 
      Porcentaje de completitud total: ${user.stats.percent} % <br> 
      Total de Ejercicios :  ${user.stats.exercises.total} <br>
      Ejercicios completados: ${user.stats.exercises.completed} <br>
      Porcentaje de Ejercicios  :  ${user.stats.exercises.percent}  % <br>
      Total de Lecturas :  ${user.stats.reads.total }<br>
      Lecturas completadas:  ${user.stats.reads.completed} <br>
      Porcentaje de Lecturas  : ${user.stats.reads.percent}  % <br>
      Total de Quizzes :  ${user.stats.quizzes.total} <br>
      Quizzes completado:  ${user.stats.quizzes.completed} <br>
      Puntuación promedio en quizzes  :  ${user.stats.quizzes.scoreAvg}</li> <br> `
    sectionMain.innerHTML = progressTable;
  }) 
};

//Función para mostrar a las estudiantes, según el cohort seleccionado 7
const showStudents = (idCohort, usersArr) => {
  console.log(idCohort, usersArr);//lim-2018-03-pre-core-pw, arreglo de 735 users, luego creo objeto options
  //aqui le damos nuevos valores al objeto global options
  options.cohortData.users = usersArr;
  console.log(options);
  getData(idCohort, `../data/cohorts/${idCohort}/progress.json`, showProgress);
};

//Función para mostrar la data del cohort seleccionado 6
const cohortLima = (idCohort, dataCohorts) => {
  console.log(idCohort, dataCohorts);//lim , 51 cohorts 
  dataCohorts.forEach((objCohort) => {
    //console.log(objCohort); todos los cohorts
    if (objCohort.id === idCohort) {
      options.cohort = objCohort;
    }
    sectionCohort = '<h1> LIM PRE CORE 2018 PM </h1>'
    sectionMain.innerHTML = sectionCohort;
  })
};

//Creando nodos del DOM: Lista de sedes, con evento CLIC. 1
campusesArr.forEach((element, i) => {
  const campus = document.createElement('li');
  campus.textContent = campusesArr[i];
  campus.id = campusesArr[i];
  listCampus.appendChild(campus);
});
listCampus.addEventListener('click', event => {
  const id = event.target.id;
  getData(id, '../data/cohorts.json', showCohorts)
});

//Eventos del DOM: Lista de cohorts, con evento CLIC. 3
listCohort.addEventListener('click', event => {
  const id = event.target.id;
  console.log(id); //lim-2018-03-pre-core-pw
  getData(id, '../data/cohorts.json', cohortLima);
  getData(id, `../data/cohorts/${id}/users.json`, showStudents);
});