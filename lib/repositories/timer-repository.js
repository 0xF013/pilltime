module.exports = (dataSource) => ({
  async getAll(userId) {
    const timers = await dataSource
      .select()
      .from('timers')
      .where('user_id', '=', userId);
    return timers;
  }
});
