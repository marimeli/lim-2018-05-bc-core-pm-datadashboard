window.computeUsersStats = (users, progress, courses) => {
    console.log('Entré a computeUsersStats!');
    //Filtrar para validar que todos los usuarios sean estudiantes. 
    let students = users.filter(user => user.role === 'student');

    //Función para calcular el porcentaje de completitud de cada curso del usuario.
    const calculatePercent = (user => {
        let percent = 0;
        for (let course of courses) {
            const userProgress = progress[user.id];
            if (userProgress.hasOwnProperty(course)) {
                percent += userProgress[course].percent;
            };
        };
        return Math.round(percent / courses.length);
    });

    //Función para calcular el progreso de cada usuario.
    const calculateStats = ((user, type) => {
        let total = 0;
        let completed = 0;
        let scoreSum = 0;
        let scoreAvg = 0;
        for (let course of courses) {
            const userProgress = progress[user.id];
            if (userProgress.hasOwnProperty(course)) {
                const units = Object.values(userProgress[course].units);
                for (unit of units) {//recorrido las unidades 
                    const parts = Object.values(unit.parts);
                    switch (type) {
                        case 'practice':
                            const exercises = parts.filter(part => part.type === 'practice'
                                && part.hasOwnProperty('exercises'));
                            for (exercise of exercises) {
                                total += exercises.length;
                                completed += exercise.completed;
                            };
                            break;
                        case 'read':
                            const reads = parts.filter(part => part.type === 'read');
                            for (read of reads) {
                                total += reads.length;
                                completed += read.completed;
                            };
                            break;
                        case 'quiz':
                            const quizzes = parts.filter(part => part.type === 'quiz'
                            && part.hasOwnProperty('score'));
                            for (quiz of quizzes) {
                                total += quizzes.length;
                                completed += quiz.completed;
                                scoreSum += quiz.score;
                                scoreAvg = Math.round(scoreSum / completed); 
                            };
                            break;
/*                         default:
                            break; */
                    }
                };
            };
        };
        let results = {
            total: total,
            completed: completed,
            percent: Math.round(completed * 100 / total)
        };
        if (type === 'quiz') {
            results.scoreSum = scoreSum;
            results.scoreAvg = scoreAvg;
        }
        return results;
    });

    //Método map para recorrer array de objetos y obtener un nuevo array
    students = students.map(user => {
        const userWithStats = {
            stats: {
                percent: calculatePercent(user),
                exercises: calculateStats(user, 'practice'),
                reads: calculateStats(user, 'read'),
                quizzes: calculateStats(user, 'quiz')
            }
        };
        return userWithStats
    });
    return students; //array de 727 students
};

window.sortUsers = (users, orderBy, orderDirection) => {
    console.log('Entré a sortUsers!');
};

window.filterUsers = (users, search) => {
    console.log('Entré a filterUsers!');
};

//Función que retorna un arreglo de usuario con stats ya calculados
window.processCohortData = (options) => {
    console.log('Entré a processCohortData!');
    console.log(options);
    //Si le hacemos OBJECT KEYS a OPTIONS retorna un array cuyos elementos representan las propiedades del objeto.
    let courses = Object.keys(options.cohort.coursesIndex);
    let studentWithStats = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    /*     let sortedData = sortUsers(computedData, options.orderBy, options.orderDirection);
    
        if (options.search !== ' ') {
            let filterData = filterUsers(sortedData, options.search);
            return filterData
        } */
    return studentWithStats; //return sortedData; 
};



    