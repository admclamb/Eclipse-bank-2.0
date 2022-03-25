const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const customersRouter = require("./customers/customers.router");
const bankAccountsRouter = require("./bankAccounts/bankAccounts.router");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/customers", customersRouter);
app.use("/bank_accounts", bankAccountsRouter);
app.use(notFound);
app.use(errorHandler);
module.exports = app;
