import con from "../config/connectDatabase.js";
class UserService {
  constructor() {}
  async getAllUser() {
    const query = `select * from User`;
    let result = (await con.promise().query(query))[0];
    return result;
  }
  async edit(IdEdit, updatedProduct) {
    const query = `UPDATE user SET firstName = ?,lastName = ?, email = ?,phoneNumber =?, address = ?,role_id = ? WHERE id = ?;`;
    const values = [
      updatedProduct.firstName,
      updatedProduct.lastName,
      updatedProduct.email,
      updatedProduct.phoneNumber,
      updatedProduct.address,
      updatedProduct.role_id,
      IdEdit,
    ];
    let res = await con.promise().query(query, values);
    return true;
  }
}
export default new UserService();
