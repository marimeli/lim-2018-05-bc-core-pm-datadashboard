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
const selectOrder = document.getElementById('select-order');


let sectionCohort = document.getElementById('cohort-content');
const selectOrderBy = document.getElementById('sorter');
const searchUser = document.getElementById('searcher'); 
const ascButton  = document.getElementById('sort-button'); 


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
const getData = (str,url,callback) => {
  fetch(url)
  .then (res=>res.json())
  .then(res =>{
    callback(str,res);
  })
}

const progressInTable = (usersWithStats) => {
  let progressTable = '';
  progressTable = `<input id="searcher" class="search" type="text" placeholder="Buscar">
 
  <option value="order-by">ORDENAR POR</option>
  <option value="name">Name</option>
  <option value="total-completed">TotalCompleted</option>
  <option value="exercises-percent">ExercisesPercent</option>
  <option value="quizzes-percent">QuizzesPercent</option>
  <option value="quizzes-average-score">QuizzesAverageScore</option>
  <option value="reads-percent">ReadsPercent</option> 
 </select> 
 <button id="sort-button" class="button-order">Ascendente</button> <br> <br>`
  progressTable += `<br> <br> <h1> LIM PRE CORE 2018 PM </h1> <br> <br>`
  sectionMain.innerHTML = progressTable;
  usersWithStats.forEach((user, i) => {
    let listUser = document.createElement('li');
    progressTable += `<li> Alumna: ${options.cohortData.users[i].name} <br>
      Porcentaje de completitud total: ${user.stats.percent} % <br>
      Total de Ejercicios :  ${user.stats.exercises.total} <br>
      Ejercicios completados: ${user.stats.exercises.completed} <br>
      Porcentaje de Ejercicios  :  ${user.stats.exercises.percent}  % <br>
      Total de Lecturas :  ${user.stats.reads.total}<br>
      Lecturas completadas:  ${user.stats.reads.completed} <br>
      Porcentaje de Lecturas  : ${user.stats.reads.percent}  % <br>
      percent de Quizzes :  ${user.stats.quizzes.percent} <br>
      Total de Quizzes :  ${user.stats.quizzes.total} <br>
      Quizzes completado:  ${user.stats.quizzes.completed} <br>
      Puntuación promedio en quizzes  :  ${user.stats.quizzes.scoreAvg}</li> <br> `
    sectionMain.innerHTML = progressTable;
  });
};

//Función para mostrar el progreso de las estudiantes 
const showProgress = (idCohort, objProgress) => {
  options.cohortData.progress = objProgress;
  let usersWithStats = processCohortData(options);
  progressInTable(usersWithStats)
};

//Función para mostrar a las estudiantes, según el cohort seleccionado 
const showStudents = (idCohort, usersArr) => {
  options.cohortData.users = usersArr;
  getData(idCohort, `../data/cohorts/${idCohort}/progress.json`, showProgress);
};

//Función para mostrar la data del cohort seleccionado 
const cohortLima = (idCohort, dataCohorts) => {
  dataCohorts.forEach((objCohort) => {
    if (objCohort.id === idCohort) {
      options.cohort = objCohort;
    }
    sectionCohort = '<h1> LIM PRE CORE 2018 PM </h1>'
    sectionMain.innerHTML = sectionCohort;
  })
  getData(idCohort, `../data/cohorts/${idCohort}/users.json`, showStudents);
};

//Función para mostrar la lista de cohorts ya filtrado, según la sede seleccionada 
const showCohorts = (id, cohortsArr) => {
  const cohortsByCampus = cohortsArr.filter(objCohort => {
    return objCohort.id.indexOf(id) !== -1;
  })
  let content = '';
  cohortsByCampus.forEach((cohort) => {
    content += `<li id='${cohort.id}' class='listC'>${cohort.id}</li>`
  })
  listCohort.innerHTML = content;
};
//Eventos del DOM: Lista de cohorts, con evento CLIC. 
listCohort.addEventListener('click', event => {
  const id = event.target.id;
  getData(id, '../data/cohorts.json', cohortLima);
});

//Creando nodos del DOM: Lista de sedes, con evento CLIC. 
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

searchUser.addEventListener('keyup', e => {
  const valueInput = e.target.value;
  options.search = valueInput;
  
  const userfiltered = processCohortData(options);
  progressInTable(userfiltered);
});

{/* <select id="sorter" class="selector" placeholder="Ordenar por">
selectOrderBy.addEventListener('change',e => {
  const valueOrder = e.target.value;
  options.orderBy = valueOrder;
}); */}

ascButton.addEventListener('change', e => {
  const direction = ascButton.innerText;
  if (direction == "ASC") {
    ascButton.innerText = "DESC";
    options.orderDirection = "DESC";
  } else {
    ascButton.innerText = "ASC";
    options.orderDirection = "ASC"
  };
});



