// Routers for getting customer / user data

const router = require("express").Router();
const controller = require("./customers.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { get } = require("express/lib/response");

router.route("/").post(controller.create).all(methodNotAllowed);

router.route("/:username").get(controller.read).all(methodNotAllowed);

module.exports = router;
