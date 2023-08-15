export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createUser = (userData) => {
    return this.dao.createUser(userData);
  };

  getAllUsers = () => {
    return this.dao.getAllUsers();
  };

  getUserById = (id) => {
    return this.dao.getUserById(id);
  };

  getUserByEMail = (mail) => {
    return this.dao.getUserByEMail(mail);
  };

  updateUserById = (id, user) => {
    return this.dao.updateUserById(id, user);
  };
}
