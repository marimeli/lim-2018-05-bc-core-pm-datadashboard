window.computeUsersStats = (users, progress, courses) => {
    //creando objeto stats
    let stats = {
        percent: 0,
        exercises: {
            total: 0,
            completed: 0,
            percent: 0
        }
    };
    //este objeto statss lo voy a meter en mis usuarios, por eso creo una variable
    let user = users[1];
    user.stats = stats;
    return [user, {}, {}]; 

    users[0].stats = stats;
    users[1].stats = stats;
    //stats.percent = 100
    return [users[1], users[0]]; 
};

window.sortUsers = (users, orderBy, orderDirection) => {
    console.log('Entré a sortUsers!');
};

window.filterUsers = (users, search) => {
    console.log('Entré a filterUsers!');
};

//esta funcion retorna un arreglo de usuario con stats ya calculados
window.processCohortData = (options) => {
    console.log('Entré a processCohortData!');
    console.log(options);

    /*     let arrCourses = Object.keys(options.cohort.coursesIndex); */
    let computedData = computeUsersStats(options.cohortData.users, options.cohortData.progress, [{}]);
    /*     let sortedData = sortUsers(computedData, options.orderBy, options.orderDirection);
    
        if (options.search !== ' ') {
            let filterData = filterUsers(sortedData, options.search);
            return filterData
        }
        return sortedData; */
    return computedData;
};