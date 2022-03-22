// Routers for getting customer / user data

const router = require("express").Router();
const controller = require("./customers.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router.route("/login").get(controller.login).all(methodNotAllowed);

module.exports = router;
