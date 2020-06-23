'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('nonprofits', [
      {
        username: 'seattleHumane',
        password: 'pass',
        contact: '(425) 641-0080',
        description:
          'Seattle Humane is the Puget Sound’s leader in animal adoption, education and welfare. Our top priority is to connect animals in need of rescue with the people who will love them.  Through our outreach, advocacy, and services we strive to ensure that animal companionship is accessible to all.',
        display_name: 'Seattle Humane',
        mission:
          'Seattle Humane promotes the human-animal bond by saving and serving pets in need, regardless of age, ability, circumstance or geography.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('nonprofits', null, {});
  },
};
