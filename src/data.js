window.computeUsersStats = (users, progress, courses) => {
    /*     console.log(users);
        console.log(progress);
        console.log(courses); */
    console.log('Entré a computeUsersStats!');
    //Filtrar para validar que todos los usuarios sean estudiantes. 
    let students = users.filter(user => user.role === 'student');

    //Función para calcular el porcentaje de completitud de cada curso del usuario.
    const calculatePercent = (user => {
        let percent = 0;
        courses.forEach(course => {
            const userProgress = progress[user.id];
            if (userProgress.hasOwnProperty(course)) {
                percent += userProgress[course].percent;
            };
        });
        return Math.round(percent / courses.length);
    });

    //Función para calcular el progreso de cada usuario.
    const calculateStats = ((user, type) => {
        let total = 0;
        let completed = 0;
        let scoreSum = 0;
        let scoreAvg = 0;
        courses.forEach(course => {
            const userProgress = progress[user.id];
            if (userProgress.hasOwnProperty(course)) {
                const units = Object.values(userProgress[course].units);
                units.forEach(unit => {
                    const parts = Object.values(unit.parts);
                    switch (type) {
                        case 'practice':
                            const exercises = parts.filter(part => part.type === 'practice' && part.hasOwnProperty('exercises'));
                            exercises.forEach((exercise, i) => {
                                total += Object.keys(exercises[i].exercises).length;
                                Object.values(exercise.exercises).forEach(exercise => {
                                    completed += exercise.completed;
                                });
                            });
                            break;
                        case 'read':
                            const reads = parts.filter(part => part.type === 'read');
                            const readsDone = parts.filter(part => part.type === 'read' && part.completed === 1);
                            total += reads.length;
                            completed += readsDone.length;
                            break;
                        case 'quiz':
                            const quizzes = parts.filter(part => part.type === 'quiz');
                            const quizzesDone = parts.filter(part => part.type === 'quiz' && part.completed === 1);
                            quizzesDone.forEach(quiz => {
                                scoreSum += quiz.score;
                            });
                            total += quizzes.length;
                            completed += quizzesDone.length;
                            break;
                    };
                });
            };
        });
        let results = {
            total: total,
            completed: completed,
            percent: Math.round(completed * 100 / total)
        };
        if (type === 'quiz') {
            results.scoreSum = scoreSum;
            results.scoreAvg = Math.round(scoreSum / total);
        }
        return results;
    });

    //Método map para recorrer array de objetos y obtener un nuevo array
    students = students.map(user => {
        const userWithStats = {
            name: user.name,
            stats: {
                percent: calculatePercent(user),
                exercises: calculateStats(user, 'practice'),
                reads: calculateStats(user, 'read'),
                quizzes: calculateStats(user, 'quiz')
            }
        };
        return userWithStats
    });
    console.log(students);
    return students; //array de 727 students
};

window.sortUsers = (users, orderBy, orderDirection) => {
    console.log('Entré a sortUsers!');
    console.log(users);
    console.log(orderBy);
    console.log(orderDirection);
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
    } else if (orderBy === 'percent') {
        sortedUsers = sortedUsers.sort(sortByPercent);
    } else if (orderBy === 'exercises') {
        sortedUsers = sortedUsers.sort(sortByExercises);
    } else if (orderBy === 'reads') {
        sortedUsers = sortedUsers.sort(sortByReads);
    } else if (orderBy === 'quizzes') {
        sortedUsers = sortedUsers.sort(sortByQuizzes);
    } else if (orderBy === 'scoreAvg') {
        sortedUsers = sortedUsers.sort(sortByScoreAvg);
    };
    if (orderDirection === 'DESC') {
        sortedUsers = sortedUsers.reverse();
    };
    console.log(sortedUsers);
    return sortedUsers;
};

window.filterUsers = (users, search) => {
    console.log('Entré a filterUsers!');
    /*     console.log(users);
        console.log(search); */
    let filteredUsers;

    if (search === '') {
        filteredUsers = users;
    } else {
        filteredUsers = users.filter(user =>
            (user.name.includes(search.toLowerCase()))
        );
    }
    /*  console.log(filteredUsers); */
    return filteredUsers;
};
//Función que retorna un arreglo de usuario con stats ya calculados
window.processCohortData = (options) => {
    console.log('Entré a processCohortData!');
    console.log(options);
    let courses = Object.keys(options.cohort.coursesIndex);
    let studentWithStats = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    let sortedData = sortUsers(studentWithStats, options.orderBy, options.orderDirection);
    let filterData = filterUsers(sortedData, options.search);
    //console.log(filterData);
    return filterData;
};