'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('volunteers', [
      {
        username: 'ultimateLucy',
        password: 'pass',
        first_name: 'Lucy',
        last_name: 'Suddenly',
        image:
          'https://pif-bucket.s3-us-west-2.amazonaws.com/pif-logo+6.07.41+PM.png',
        bio:
          'Hi my name is Lucy and I love programming. I also enjoy playing video games and D&D',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('volunteers', null, {});
  },
};
