window.processCohortData = (options) => {
    (cohort) => {
        let options = {
            cohort: {},
            cohortData: {
                user: [],
                progress: {}
            },
            orderBy: '',
            orderDirection: '',
            search: ''
        };

    }
},


window.computeUsersStats = (users, progress, courses) => {

    let usersWithStats = (user) => {
        let stats = {
            percent: 0,
            exercises: {
                total: 0,
                completed: 0,
                percent: 0
            },
            reads: {
                total: 0,
                completed: 0,
                percent: 0
            },
            quizzes: {
                total: 0,
                completed: 0,
                percent: 0,
                scoreSum: 0,
                scoreAvg: 0
            }
        };
    };
};