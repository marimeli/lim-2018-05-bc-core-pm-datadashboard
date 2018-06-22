
window.processCohortData = (options) => {

};



window.computeUsersStats = (users, progress, courses) => {
   
};

window.sortUsers = (users, orderBy, orderDirection) => {

};

window.filterUsers = (users, search) => {

};
  

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

<<<<<<< HEAD


=======
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
>>>>>>> f327d366cd22978283b567a99a7441f3a8c55ba9
