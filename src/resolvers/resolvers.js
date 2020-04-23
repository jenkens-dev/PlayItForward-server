const resolvers = {
  Query: {
    hi: () => 'hi',
    events: () => data.events,
    event: (obj, { id }, context, info) =>
      data.events.find((event) => event.id === id),
    nonprofits: () => data.nonprofits,
  },
};

module.exports = resolvers;
