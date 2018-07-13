//Almacenando las variables para la selección de DOM
const menuButton = document.querySelector('.menu-button')
<<<<<<< HEAD
const submenu = document.getElementsByClassName('submenu');
=======
>>>>>>> 1793dc6c85d0e6e68ca878d78089b12de0e283e6
const campusesArr = ['aqp', 'cdmx', 'gdl', 'lim', 'scl', 'spl'];
const listCampus = document.getElementById('items-campuses');
const listCohort = document.getElementById('items-cohorts');
const sectionMain = document.querySelector('#main-content');
const campuses = document.getElementById('campuses');
const cohorts = document.getElementById('cohorts');
const optionsList = document.getElementById('options-list');
<<<<<<< HEAD
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
=======
const optionsArr = ['perfil', 'mensajes', 'cerrar sesión'];
const userName = document.getElementById('user-name');
const usersList = document.getElementById('users-list');
const selectOrderBy = document.getElementById('sorter');
const searchUser = document.getElementById('searcher');
const ascButton = document.getElementById('sort-button');
let sectionCohort = document.getElementById('cohort-content');
let errorCase = null;
let campusSection = null;
let sectionProfile = null;

//Creando objeto options 
const options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null
  },
  orderBy: '',
  orderDirection: '',
  search: ''
};

//Función para mostrar y ocultar las opciones del perfil de usuario
const showOptionsList = () => {
  if (optionsList.style.display === 'block') {
    optionsList.style.display = 'none';
  }
  else {
    optionsList.style.display = 'block';
  }
>>>>>>> 1793dc6c85d0e6e68ca878d78089b12de0e283e6
};
userName.addEventListener('click', showOptionsList);

<<<<<<< HEAD
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



=======
//Creando lista de opciones del perfil de usuario
optionsArr.forEach((element, i) => {
  const option = document.createElement('li');
  option.textContent = optionsArr[i];
  option.id = optionsArr[i];
  optionsList.appendChild(option);
});

//Función para mostrar la vista de la opción seleccionada
const optionSelected = (optionsList) => {
  if (optionsList === 'perfil') {
    sectionProfile = ` <img src="images/ale.png"> <h1> Alejandra Ramirez </h1>`
    sectionMain.innerHTML = sectionProfile;
  }
  else if (optionsList === 'cerrar sesión') {
    window.location.assign("index.html")
  }
  else if (optionsList === 'mensajes') {
    alert('No tienes ningún mensaje por el momento');
  }
};
optionsList.addEventListener('click', event => {
  const id = event.target.id;
  getData(id, '../data/cohorts.json', optionSelected);
});

//Función para mostrar y ocultar el menú
const showSidebar = () => {
  document.body.classList.toggle('sidebar-active');
};
menuButton.addEventListener('click', showSidebar);

//Función para mostrar la lista de sedes del submenu
const showCampuses = () => {
  if (listCampus.style.display === 'block') {
    listCampus.style.display = 'none';
  }
  else {
    listCampus.style.display = 'block';
  }
};
campuses.addEventListener('click', showCampuses);

//Función para mostrar la lista de cohorts del submenu
const showCohortsList = () => {
  if (listCohort.style.display === 'block') {
    listCohort.style.display = 'none';
  }
  else {
    listCohort.style.display = 'block';
  }
};
cohorts.addEventListener('click', showCohortsList);

//Función para hacer las peticiones AJAX, usando el método GET
const getData = (str, url, callback) => {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      callback(str, res);
    });
};

const progressInTable = (usersWithStats) => {
  console.log(usersWithStats);
  let progressTable = '';
  progressTable += `
  <thead class="header-table">
    <tr>
      <th scope="col">Alumna</th>
      <th scope="col">% Total</th>
      <th scope="col">% Ejercicios</th>
      <th scope="col">% Quizzes</th>
      <th scope="col">Quizzes Average Score</th>
      <th scope="col">% Reads</th>
    </tr> 
  </thead> `
  let tbodyContent = ''
  usersWithStats.forEach((user, i) => {
    let listUser = document.createElement('tr');
    let listProgress = document.createElement('th');
    tbodyContent += `
    <tr>
      <th scope="row">${user.name}</th>
      <th scope="row">${user.stats.percent}</th>
      <th scope="row">${user.stats.exercises.percent}</th>
      <th scope="row">${user.stats.quizzes.percent}</th>
      <th scope="row">${user.stats.quizzes.scoreAvg}</th>
      <th scope="row">${user.stats.reads.percent}</th>
   </tr>`
  });
  //Corregir posición de la tabla
  usersList.innerHTML = progressTable + '<tbody>' + tbodyContent + '</tbody>';
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
    //console.log(objCohort); todos los cohorts
    if (objCohort.id === idCohort) {
      options.cohort = objCohort;
    }
    ////No pinta el mensaje de error CORREGIR
    else {
      errorCase = `<h3> PROGRESO DEL COHORT </h3>`
      sectionMain.innerHTML = errorCase;
    }
  })
  getData(idCohort, `../data/cohorts/${idCohort}/users.json`, showStudents);
};

//Función para mostrar la lista de cohorts ya filtrado, según la sede seleccionada 
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
listCohort.addEventListener('click', event => {
  const id = event.target.id;
  getData(id, '../data/cohorts.json', cohortLima);
});

//Condicionales en caso de escoger otra sede diferente a Lima 
const campusSelected = (listCampus) => {
  if (listCampus === 'lim') {
    campusSection = `<h1> SEDE LIMA </h1><img class="prom-img" src="images/sede-lima.jpg"><br>
    <img src="images/info-sede-lima.png">`
    sectionMain.innerHTML = campusSection;
  }
  //No pinta el mensaje de error CORREGIR
  else {
    errorCase = `<h3> No hay información sobre esta sede, escoge otra por favor </h3>`
    sectionMain.innerHTML = errorCase;
  }
};

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
  getData(id, '../data/cohorts.json', campusSelected)
});


searchUser.addEventListener('keyup', e => {
  options.search = searchUser.value;
  const userfiltered = processCohortData(options);
  progressInTable(userfiltered);
});

selectOrderBy.addEventListener('change', e => {
  options.orderBy = selectOrderBy.value;
  const userOrdered = processCohortData(options);
  progressInTable(userOrdered);
});

ascButton.addEventListener('click', e => {
  const direction = ascButton.innerText;
  if (direction == 'ASCENDENTE') {
    options.orderDirection = 'ASC';
    ascButton.innerText = 'DESCENDENTE';
    
  } else {
    options.orderDirection = 'DESC'
    ascButton.innerText = 'ASCENDENTE';
  };
  const userOrdered = processCohortData(options);
  progressInTable(userOrdered);
});
>>>>>>> 1793dc6c85d0e6e68ca878d78089b12de0e283e6
