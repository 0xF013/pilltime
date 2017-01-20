module.exports = (dataSource) => ({
  async getTokenForCredentials(email, password) {
    const [token] = await dataSource
      .select('access_token')
      .from('users')
      .where('email', '=', email)
      .andWhere('password', '=', password)
      .count('id');
    return token;
  },

  async findUserByToken(token) {
    const user = await dataSource
      .select()
      .from('users')
      .where('token', '=', token);
    return user;
  }
});
