import ProductController from "../controller/ProductController.js";

export function handlePathGet(rootPath, path, req, res) {
  switch (rootPath) {
    case "home":
      ProductController.getAllHome(req, res);
      break;
    case "faq":
      ProductController.getFaq(req, res);
      break;
    case "register":
      ProductController.getRegister(req, res);
      break;
    case "login":
      ProductController.getLogin(req, res);
      break;

    case "contact":
      ProductController.getContact(req, res);
      break;
    case "user":
      handleActionGetUser(path, req, res);
      break;
    case "courses":
      handleActionGetCourse(path, req, res);
      break;
    case "category":
      handleActionGetCategory(path, req, res);
      break;
    case "dashbroad":
      ProductController.getDashbroad(req, res);
      break;
    case "style":
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Static files are served elsewhere.");
      break;
    default:
      ProductController.showErr(req, res);
  }
}

export function handlePathPost(rootPath, path, req, res) {
  switch (rootPath) {
    case "register":
      ProductController.addUser(req, res);
      break;
    case "login":
      ProductController.loginUser(req, res);
      break;
    case "user":
      handleActionPost(path, req, res);
      break;
    case "courses":
      handleActionPost(path, req, res);
      break;
    case "category":
      handleActionPost(path, req, res);
      break;
  }
}
function handleActionGetCourse(path, req, res) {
  switch (path) {
    case "delete":
      ProductController.remove(req, res);
      break;
    case "edit":
      ProductController.showFormEditCourse(req, res);
      break;
    case "add":
      ProductController.showFormAddCourse(req, res);
      break;
  }
}
function handleActionGetUser(path, req, res) {
  switch (path) {
    case "delete":
      ProductController.remove(req, res);
      break;
    case "edit":
      ProductController.showFormEditUser(req, res);
      break;
  }
}
function handleActionGetCategory(path, req, res) {
  switch (path) {
    case "delete":
      ProductController.remove(req, res);
      break;
    case "edit":
      ProductController.showFormEditCategory(req, res);
      break;
    case "add":
      ProductController.showFormAddCategory(req, res);
      break;
  }
}
function handleActionPost(path, req, res) {
  switch (path) {
    case "edit":
      ProductController.edit(req, res);
      break;
    case "add":
      ProductController.add(req, res);
      break;
  }
}
