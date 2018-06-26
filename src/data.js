const getJSON = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = _ => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                return callback(new Error(`HTTP error: ${xhr.status}`));
            }
            try {
                callback(null, JSON.parse(xhr.responseText));
            } catch (err) {
                callback(err);
            }
        }
    };

    xhr.open('GET', url);
    xhr.send();
};

/* const processCohortData = (options) => {
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


const computeUsersStats = (users, progress, courses) => {

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
        },
    }
}; */


