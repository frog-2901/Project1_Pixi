import con from "../config/connectDatabase.js";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
class ProductService {
  constructor() {}
  async getAll() {
    const query = `select * from courses`;
    let result = (await con.promise().query(query))[0];
    return result;
  }
  async add(newUser) {
    let hashPassword = bcrypt.hashSync(newUser.password, salt);
    const query = `insert into User(firstName, lastName, email, password) values ("${newUser.firstName}", "${newUser.lastName}","${newUser.email}","${hashPassword}")`;
    await con.promise().query(query);
    return true;
  }
  async addCourse(newProduct) {
    const query = `insert into Courses(course_name, price, overview, img,category_id) values ("${newProduct.course_name}", "${newProduct.price}","${newProduct.overview}","${newProduct.img}", "${newProduct.category_id}")`;
    await con.promise().query(query);
    return true;
  }
  async getUserByUsername(username) {
    const query = `SELECT * FROM User WHERE email = ?`;
    const [rows] = await con.promise().query(query, [username]);
    return rows[0];
  }
  async getUser() {
    const query = `SELECT * FROM user`;
    let result = (await con.promise().query(query))[0];
    return result;
  }
  async delete(deleteID, DeleteName) {
    const query = `DELETE FROM ${DeleteName} WHERE id = ?;`;
    await con.promise().query(query, [deleteID]);
    return true;
  }
  async edit(IdEdit, updatedProduct) {
    const query = `UPDATE courses SET course_name = ?, price = ?,overview =?, img = ?, category_id = ? WHERE id = ?;`;
    const values = [
      updatedProduct.name,
      updatedProduct.price,
      updatedProduct.overview,
      updatedProduct.img,
      updatedProduct.category_id,
      IdEdit,
    ];
    let res = await con.promise().query(query, values);
    return true;
  }
}
export default new ProductService();
