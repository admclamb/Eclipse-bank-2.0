// Routers for getting bank_account data

const router = require("express").Router();
const controller = require("./bankAccounts.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").post(controller.create).all(methodNotAllowed);

router.route("/:account_ID").get(controller.read).all(methodNotAllowed);

module.exports = router;
