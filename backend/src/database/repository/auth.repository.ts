import Repository from '../Repository';

class AuthRepository extends Repository {
  constructor() {
    super();
  }
  register = async (param: any) => {
    const query = `insert into profile(username, first_name, last_name , email, password) values(:username, :first_name, :last_name, :email, :password)`;
    const params = [
      param.username,
      param.first_name,
      param.last_name,
      param.email,
      param.password,
    ];
    const result = await this.query(query, params);
    return result;
  };
  getUser = async (param: any) => {
    const query = `SELECT * from profile where username = :username`;
    const params = [param];
    const result = await this.query(query, params);
    return result;
  };
}
export default AuthRepository;
