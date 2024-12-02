import con from "../config/connectDatabase.js";
class CategoryService {
  constructor() {}
  async getAllCategory() {
    const query = `select * from category`;
    let result = (await con.promise().query(query))[0];
    return result;
  }
  async addCategory(newCategory) {
    const query = `INSERT INTO category (name) VALUES ("${newCategory}");`;
    let result = await con.promise().query(query);
    return result;
  }
  async edit(IdEdit, updatedProduct) {
    const query = `UPDATE category SET name = ? WHERE id = ?;`;
    const values = [updatedProduct.name, IdEdit];
    let res = await con.promise().query(query, values);
    return true;
  }
}
export default new CategoryService();
