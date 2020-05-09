const resolvers = {
  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { stream, filename, mimetype, encoding } = await file;

      // Do work 💪

      return { filename, mimetype, encoding, url: '' };
    },
  },
};

module.exports = resolvers;
