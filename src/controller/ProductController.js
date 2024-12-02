import fs from "fs";
import qs from "qs";
import bcrypt from "bcrypt";
import ProductService from "../model/ProductService.js";
import CategoryService from "../model/CategoryService.js";
import { use } from "bcrypt/promises.js";
import RoleService from "../model/RoleService.js";
import userService from "../model/userService.js";

class ProductController {
  constructor() {
    this.ProductService = ProductService;
    this.CategoryService = CategoryService;
    this.RoleService = RoleService;
    this.userService = userService;
  }
  getFaq = async (req, res) => {
    let html = fs.readFileSync("./views/faq.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);

    return res.end();
  };
  getRegister = async (req, res) => {
    let html = fs.readFileSync("./views/register.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  getLogin = async (req, res) => {
    let html = fs.readFileSync("./views/login.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  showErr = async (req, res) => {
    let html = fs.readFileSync("./views/not-found.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  getContact = async (req, res) => {
    let html = fs.readFileSync("./views/contact.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  getAllHome = async (req, res) => {
    let html = fs.readFileSync("./views/index.html", "utf-8");
    let textList = ``;
    let textList2 = ``;
    let listCourse = await this.ProductService.getAll();
    let listCategory = await this.CategoryService.getAllCategory();
    listCourse.map((item) => {
      textList += `
        <a
                href="./single-course.html"
                class="list-group-item list-group-item-action"
              >
                <div class="row align-items-center">
                  <div class="col-md-4">
                    <div>
                      <img
                        src="${item.img}"
                        alt=""
                        class="rounded img-fluid w-100"
                      />
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h5>
                      ${item.course_name}
                    </h5>
                    <p class="text-secondary">
                      ${item.overview}
                    </p>
                    <div class="d-inline-flex align-items-center">
                      <span
                        class="px-2 py-1 rounded-pill text-bg-warning me-2 d-inline-flex align-items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star-fill me-2"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                          ></path>
                        </svg>
                        Rating: 4.7
                      </span>
                      <span class="px-2 py-1 rounded-pill text-bg-success">
                        Price:${item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
        `;
    });
    listCategory.map((item) => {
      textList2 += `
         <a
                class="align-items-center list-group-item d-flex justify-content-between"
                href="#!"
              >
                ${item.name}
                <span class="badge rounded-pill text-bg-warning">1</span>
              </a>
      `;
    });
    html = html.replace("{list}", textList);
    html = html.replace("{listCategory}", textList2);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);

    return res.end();
  };
  addUser = async (req, res) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      const dataForm = qs.parse(data);
      await this.ProductService.add(dataForm);
      res.writeHead(302, {
        Location: "/login",
      });
      res.end();
    });
  };
  loginUser = async (req, res) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      const dataForm = qs.parse(data);

      const { username, password } = dataForm;

      // Lấy thông tin người dùng từ cơ sở dữ liệu
      const user = await this.ProductService.getUserByUsername(dataForm.email);

      if (!user) {
        res.writeHead(401, { "Content-Type": "text/html" });
        res.write("<h1>User not found</h1>");
        res.end();
        return;
      }
      if (user.email === "huuuoc29@gmail.com") {
        res.writeHead(302, { Location: "/dashbroad" }); // Chuyển hướng đến trang chủ
        res.end();
        return;
      }
      // So sánh mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.writeHead(302, { Location: "/home" }); // Chuyển hướng đến trang chủ
        res.end();
        return;
      } else {
        console.log("Login faile");
        res.writeHead(401, { "Content-Type": "text/html" });
        res.end();
        return;
      }
    });
  };
  getDashbroad = async (req, res) => {
    let html = fs.readFileSync("./views/dashbroad.html", "utf-8");
    let text = ``;
    let text2 = ``;
    let text3 = ``;
    let listUser = await this.ProductService.getUser();
    listUser.map((item) => {
      text += `
      <tr>
              
                <td>${item.id}</td>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.phoneNumber}</td>
                <td>${item.address}</td>
                <td>${item.role_id}</td>
                <td scope="col"><a href="http://localhost:3000/user/delete/${item.id}">Delete</a></td>
                <td scope="col"><a href="http://localhost:3000/user/edit/${item.id}">Edit</a></td>
              </tr>`;
    });
    let listCourse = await this.ProductService.getAll();
    listCourse.map((item) => {
      text2 += `
      <tr>
              <td scope="col">${item.id}</td>
              <td scope="col">${item.course_name}</td>
              <td scope="col">${item.price}</td>
              <td scope="col">${item.overview}</td>
              <td scope="col"><img class="img-fluid" src="${item.img}" alt=""></td>
              <td scope="col">${item.category_id}</td>
              <td scope="col"><a href="http://localhost:3000/courses/delete/${item.id}">Delete</a></td>
                <td scope="col"><a href="http://localhost:3000/courses/edit/${item.id}">Edit</a></td>
               </tr>`;
    });
    let listCategories = await this.CategoryService.getAllCategory();
    listCategories.map((item) => {
      text3 += `<tr>
                <td scope="col">${item.id}</td>
                <td scope="col">${item.name}</td>
                <td scope="col"><a href="http://localhost:3000/category/delete/${item.id}">Delete</a></td>
                <td scope="col"><a href="http://localhost:3000/category/edit/${item.id}">Edit</a></td>
                
              </tr>
             
  
`;
    });
    html = html.replace("{listUser}", text);
    html = html.replace("{listCourses}", text2);
    html = html.replace("{listCategories}", text3);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  showFormAddCategory = async (req, res) => {
    let html = fs.readFileSync("./views/category/add.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  showFormAddCourse = async (req, res) => {
    let html = fs.readFileSync("./views/courses/add.html", "utf-8");
    let textList = "";
    let listCategory = await this.CategoryService.getAllCategory();
    listCategory.map((item) => {
      textList += `
      <option value="${item.id}">${item.name}</option>
      `;
    });
    html = html.replace("{list}", textList);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  add = async (req, res) => {
    let data = ``;
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      const dataForm = qs.parse(data);
      let nameAdd = req.url.split("/")[1];

      switch (nameAdd) {
        case "courses":
          await this.ProductService.addCourse(dataForm);
          break;
        case "category":
          await this.CategoryService.addCategory(dataForm.name);
          break;
      }
      res.writeHead(302, {
        Location: "/dashbroad",
      });
      return res.end();
    });
  };
  remove = async (req, res) => {
    let idDelete = +req.url.split("/")[3];
    let nameDelete = req.url.split("/")[1];
    if (!idDelete) {
      console.log("Err");
      return;
    }
    switch (nameDelete) {
      case "user":
        await this.ProductService.delete(idDelete, nameDelete);
        break;
      case "courses":
        await this.ProductService.delete(idDelete, nameDelete);
        break;
      case "category":
        await this.ProductService.delete(idDelete, nameDelete);
        break;
    }

    res.writeHead(302, {
      Location: "/dashbroad",
    });
    res.end();
  };
  showFormEditCourse = async (req, res) => {
    let idEdit = +req.url.split("/")[3];

    if (!idEdit) {
      await this.showErr(req, res);
      return;
    }
    let listCourses = await this.ProductService.getAll();
    let product = listCourses.find((item) => item.id == idEdit);
    let html = fs.readFileSync("./views/courses/edit.html", {
      encoding: "utf-8",
    });
    let textList = "";
    let listCategory = await this.CategoryService.getAllCategory();
    listCategory.map((item) => {
      textList += `
      <option value="${item.id}">${item.name}</option>
      `;
    });
    html = html.replaceAll("{id}", product.id);
    html = html.replace("{price}", product.price);
    html = html.replace("{name}", product.course_name);
    html = html.replace("{overview}", product.overview);
    html = html.replace("{list}", textList);
    html = html.replaceAll("{img}", product.img);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  showFormEditCategory = async (req, res) => {
    let idEdit = +req.url.split("/")[3];
    if (!idEdit) {
      await this.showErr(req, res);
      return;
    }
    let listCategory = await this.CategoryService.getAllCategory();
    let category = listCategory.find((item) => item.id == idEdit);
    let html = fs.readFileSync("./views/category/edit.html", {
      encoding: "utf-8",
    });
    html = html.replaceAll("{id}", category.id);
    html = html.replace("{name}", category.name);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  showFormEditUser = async (req, res) => {
    let idEdit = +req.url.split("/")[3];
    if (!idEdit) {
      await this.showErr(req, res);
      return;
    }
    let listUser = await this.ProductService.getUser();
    let User = listUser.find((item) => item.id == idEdit);
    let html = fs.readFileSync("./views/user/edit.html", {
      encoding: "utf-8",
    });
    let listRole = await this.RoleService.getAllRole();
    let textList = "";
    listRole.map((item) => {
      textList += `
      <option value="${item.id}">${item.name}</option>
      `;
    });
    html = html.replaceAll("{id}", User.id);
    html = html.replace("{firstName}", User.firstName);
    html = html.replace("{lastName}", User.lastName);
    html = html.replace("{email}", User.email);
    html = html.replace("{phoneNumber}", User.phoneNumber);
    html = html.replace("{address}", User.address);
    html = html.replace("{list}", textList);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    return res.end();
  };
  edit(req, res) {
    let data = "";
    let nameEdit = req.url.split("/")[1];

    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      const dataForm = qs.parse(data);

      switch (nameEdit) {
        case "user":
          await this.userService.edit(dataForm.id, dataForm);
          break;
        case "courses":
          await this.ProductService.edit(dataForm.id, dataForm);
          break;
        case "category":
          await this.CategoryService.edit(dataForm.id, dataForm);
          break;
      }
      res.writeHead(302, {
        Location: "/dashbroad",
      });
      res.end();
    });
  }
}
export default new ProductController();
