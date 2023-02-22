module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn(
      'users',
      'full_name',
      'name',
    );
  },
};
