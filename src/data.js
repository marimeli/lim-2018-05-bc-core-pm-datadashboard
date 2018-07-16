window.computeUsersStats = (users, progress, courses) => {
    //Filtrar para validar que todos los usuarios sean estudiantes.
    let students = users.filter(user => user.role === 'student');
    //console.log(students);

    //Función para calcular el porcentaje de completitud de cada curso del usuario.
    const calculateCoursePercent = (user) => {
        let percent = 0;
        courses.forEach(course => {
            const userProgress = progress[user.id];
            (userProgress.hasOwnProperty(course)) ? percent += userProgress[course].percent : percent = 0;
        });
        return percent / courses.length;
    };

    //Función para calcular el progreso de cada usuario.
    const calculateUsersStats = (user, type) => {
        let total = 0;
        let completed = 0;
        let scoreSum = 0;
        let scoreAvg = 0;
        courses.forEach((course) => {
            const userProgress = progress[user.id];
            if (userProgress.hasOwnProperty(course)) {
                const units = Object.values(userProgress[course].units);
                units.forEach(unit => {
                    const parts = Object.values(unit.parts);
                    switch (type) {
                        case 'practice': //Para evaluar todos los ejercicios que sean de tipo practica
                            const myExercises = parts.filter(part => part.type === 'practice' && part.hasOwnProperty('exercises'));
                            myExercises.forEach(objExercise => completed += objExercise.completed);
                            total += myExercises.length;
                            break;
                        //Para determinar todas las lecturas completadas
                        case 'read':
                            const reads = parts.filter(part => part.type === 'read');
                            reads.forEach(objRead => completed += objRead.completed);
                            total += reads.length;
                            break;
                        //Para sabes la puntuación promedio de las evaluaciones
                        case 'quiz':
                            const quizzes = parts.filter(part => part.type === 'quiz');
                            quizzes.forEach((objQuiz) => {
                                completed += objQuiz.completed;
                                if (objQuiz.hasOwnProperty('score')) {
                                    scoreSum += objQuiz.score;
                                } else {
                                    scoreSum += 0;
                                }
                            });
                            total += quizzes.length;
                            break;
                    }
                });
            }
        });
        //Almacenando los resultados del progreso de cada usuario
        let results = {};
        if (completed !== 0) {
            results.total = total;
            results.completed = completed;
            results.percent = Math.round(completed * 100 / total);
        } else {
            results.completed = 0;
            results.percent = 0;
        }
        if (type === 'quiz') {
            if (completed !== 0) {
                results.scoreSum = scoreSum;
                results.scoreAvg = Math.round(scoreSum / completed);
            } else {
                results.scoreAvg = 0;
            }
        }
        return results;
    };

    //Asignando stats y nombre a los usuarios filtrados
    students = students.map(user => {
        let usersWithStats = {
            name: user.name,
            stats: {
                percent: calculateCoursePercent(user),
                exercises: calculateUsersStats(user, 'practice'),
                reads: calculateUsersStats(user, 'read'),
                quizzes: calculateUsersStats(user, 'quiz')
            }
        };
        return usersWithStats;
        //console.log(usersWithStats);
    });
    return students;
    //console.log(students);
};

window.sortUsers = (users, orderBy, orderDirection) => {
    /*     console.log('Entré a sortUsers!');
        console.log(users);
        console.log(orderBy);
        console.log(orderDirection); */
    const sortByName = (a, b) => {
        if (a.name > b.name) {
            return 1;
        } if (a.name < b.name) {
            return -1;
        } return 0;
    };

    const sortByPercent = (a, b) => {
        if (a.stats.percent > b.stats.percent) {
            return 1;
        } if (a.stats.percent < b.stats.percent) {
            return -1;
        } return 0;
    };

    const sortByExercises = (a, b) => {
        if (a.stats.exercises.percent > b.stats.exercises.percent) {
            return 1;
        } if (a.stats.exercises.percent < b.stats.exercises.percent) {
            return -1;
        } return 0;
    };

    const sortByReads = (a, b) => {
        if (a.stats.reads.percent > b.stats.reads.percent) {
            return 1;
        } if (a.stats.reads.percent < b.stats.reads.percent) {
            return -1;
        } return 0;
    };

    const sortByQuizzes = (a, b) => {
        if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
            return 1;
        } if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
            return -1;
        } return 0;
    };

    const sortByScoreAvg = (a, b) => {
        if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) {
            return 1;
        } if (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg) {
            return -1;
        } return 0;
    };

    let sortedUsers = users;
    if (orderBy === 'name') {
        sortedUsers = sortedUsers.sort(sortByName);
    }    
    sortedUsers = (orderBy === 'percent') ? sortedUsers.sort(sortByPercent) : sortedUsers;
    sortedUsers = (orderBy === 'exercises') ? sortedUsers.sort(sortByExercises) : sortedUsers;
    sortedUsers = (orderBy === 'reads') ? sortedUsers.sort(sortByReads) : sortedUsers;
    sortedUsers = (orderBy === 'quizzes') ? sortedUsers.sort(sortByQuizzes) : sortedUsers;
    sortedUsers = (orderBy === 'scoreAvg') ? sortedUsers.sort(sortByScoreAvg) : sortedUsers;
    if (orderDirection === 'DESC') {
        sortedUsers = sortedUsers.reverse();
    };
    /*    console.log(sortedUsers); */
    return sortedUsers;
};

window.filterUsers = (users, search) => {
/*     console.log('Entré a filterUsers'); */
    let filteredUsers = users.filter(user => user.name.toUpperCase().indexOf(search.toUpperCase()) > -1);
    return filteredUsers;
};

//Función que retorna un arreglo de usuario con stats ya calculados
window.processCohortData = (options) => {
    /*  console.log('Entré a processCohortData!');
     console.log(options); */
    let courses = Object.keys(options.cohort.coursesIndex);
    let studentWithStats = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    let sortedData = sortUsers(studentWithStats, options.orderBy, options.orderDirection);
    let filterData = filterUsers(sortedData, options.search);
    //console.log(filterData);
    return filterData;
};