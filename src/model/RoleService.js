import con from "../config/connectDatabase.js";
class RoleService {
  constructor() {}
  async getAllRole() {
    const query = `select * from Role`;
    let result = (await con.promise().query(query))[0];
    return result;
  }
}
export default new RoleService();
