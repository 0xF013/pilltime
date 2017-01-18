class UserRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async getTokenForCredentials(email, password) {
    const [token] = await this.dataSource
      .select('access_token')
      .from('users')
      .where('email', '=', email)
      .andWhere('password', '=', password)
      .count('id');
    return token;
  }

  async findUserByToken(token) {
    const user = await this.dataSource
      .select()
      .from('users')
      .where('token', '=', token);
    return user;
  }
}

module.exports = UserRepository;
