'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('nonprofits', [
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
      {
        username: 'paws',
        password: 'pass',
        contact: '(425) 787-2500',
        description:
          'PAWS helps cats, dogs and wild animals go home and thrive – whether home is the family room or the forest. We do this by rehabilitating orphaned and injured wildlife, sheltering and adopting homeless cats and dogs, and educating the community to inspire compassionate action for animals.',
        display_name: 'PAWS',
        mission:
          'PAWS is people helping cats, dogs and wild animals go home and thrive.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const nonprofits = await queryInterface.sequelize.query(
      `SELECT id from NONPROFITS`,
    );

    const nonprofitRows = nonprofits[0];

    await queryInterface.bulkInsert('volunteers', [
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

    const volunteers = await queryInterface.sequelize.query(
      `SELECT id from VOLUNTEERS`,
    );

    const volunteerRows = volunteers[0];

    await queryInterface.bulkInsert('events', [
      {
        title: 'Tuxes & Tails',
        date: '2020-09-26',
        location:
          'Hyatt Regency Bellevue 900 Bellevue Way NE Bellevue, WA 98004',
        nonprofit_id: nonprofitRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const events = await queryInterface.sequelize.query(
      `SELECT id from EVENTS`,
    );

    const eventRows = events[0];

    await queryInterface.bulkInsert('event_volunteers', [
      {
        volunteer_id: volunteerRows[0].id,
        event_id: eventRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('nonprofits', null, {});
    await queryInterface.bulkDelete('volunteers', null, {});
    await queryInterface.bulkDelete('events', null, {});
    await queryInterface.bulkDelete('event_volunteers', null, {});
  },
};
