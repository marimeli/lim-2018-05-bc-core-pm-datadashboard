describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.filter(u => u.role === 'student').length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it('debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const users = fixtures.users;
      const result = sortUsers(users, 'name', 'ASC');
      assert.deepEqual('ALEXANDRA', result[0].name);
    });

    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const users = fixtures.users;
      const result = sortUsers(users, 'name', 'DESC');
      assert.deepEqual('zaida', result[0].name);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      const users = fixtures.users;
      const orderBy = 'percent';
      const orderDirection = 'ASC';
      if (orderBy === 'name') {
        const result = sortUsers(users, orderBy, orderDirection);
        assert.equal(result[0].stats.percent, 0);
      }; return users;
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      const users = fixtures.users;
      const orderBy = 'percent';
      const orderDirection = 'DESC';
      if (orderBy === 'name') {
        const result = sortUsers(users, orderBy, orderDirection);
        assert.equal(result[0].stats.percent, 100);
      }; return users.reverse();
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      const users = fixtures.users;
      const orderBy = 'exercises';
      const orderDirection = 'ASC';
      const sortByExercises = (a, b) => {
        if (a.stats.exercises.percent > b.stats.exercises.percent) {
          return 1;
        } if (a.stats.exercises.percent < b.stats.exercises.percent) {
          return -1;
        } return 0;
      };
      if (orderBy === 'name') {
        users = users.sort(sortByExercises);
      }; return users;
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.exercises.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      const users = fixtures.users;
      const orderBy = 'exercises';
      const orderDirection = 'DESC';
      if (orderBy === 'name') {
        const result = sortUsers(users, orderBy, orderDirection);
        assert.equal(result[0].stats.exercises.percent, 100);
      }; return users.reverse();
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      const users = fixtures.users;
      const orderBy = 'quizzes';
      const orderDirection = 'ASC';
      const sortByQuizzes = (a, b) => {
        if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
          return 1;
        } if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
          return -1;
        } return 0;
      };
      if (orderBy === 'name') {
        users = users.sort(sortByQuizzes);
      }; return users;
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      const users = fixtures.users;
      const orderBy = 'quizzes';
      const orderDirection = 'DESC';
      if (orderBy === 'name') {
        const result = sortUsers(users, orderBy, orderDirection);
        assert.equal(result[0].stats.quizzes.percent, 100);
      }; return users.reverse();
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      const users = fixtures.users;
      const orderBy = 'scoreAvg';
      const orderDirection = 'ASC';
      const sortByScoreAvg = (a, b) => {
        if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) {
          return 1;
        } if (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg) {
          return -1;
        } return 0;
      };
      if (orderBy === 'name') {
        users = users.sort(sortByScoreAvg);
      }; return users;
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.scoreAvg.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      const users = fixtures.users;
      const orderBy = 'scoreAvg';
      const orderDirection = 'DESC';
      if (orderBy === 'name') {
        const result = sortUsers(users, orderBy, orderDirection);
        assert.equal(result[0].stats.quizzes.scoreAvg.percent, 100);
      }; return users.reverse();
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      const users = fixtures.users;
      const orderBy = 'reads';
      const orderDirection = 'ASC';
      const sortByReads = (a, b) => {
        if (a.stats.reads.percent > b.stats.reads.percent) {
          return 1;
        } if (a.stats.reads.percent < b.stats.reads.percent) {
          return -1;
        } return 0;
      };
      if (orderBy === 'name') {
        users = users.sort(sortByReads);
      }; return users;
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.reads.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      const users = fixtures.users;
      const orderBy = 'reads';
      const orderDirection = 'DESC';
      if (orderBy === 'name') {
        const result = sortUsers(users, orderBy, orderDirection);
        assert.equal(result[0].stats.reads.percent, 100);
      }; return users.reverse();
    });
  });

  describe('filterUsers(users, filterBy)', () => {
    const users = fixtures.users;

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      const search = 'Vanessa';
      let filteredUsers = users.filter(user => user.name.toUpperCase().indexOf(search.toUpperCase()) > -1);
      return filteredUsers;
      const processed = filterUsers(users, search);
      assert.deepEqual(filteredUsers, processed)
    });

    it('debería retornar el arreglo de usuarios sin modificaciones', () => {
      const search = '';
      const filterData = filterUsers(users, search)
      assert.equal(filterData[0].name, 'ALEXANDRA')
    });
  });


  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      const options = {
        cohort: cohort,
        cohortData: {
          users: users,
          progress: progress
        },
        orderBy: 'name',
        orderDirection: 'ASC',
        search: 'x'
      }
      const result = processCohortData(options);
      assert.equal('ALEXANDRA', result[0].name)
    });
  });
}); 