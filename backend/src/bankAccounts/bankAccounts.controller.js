const service = require("./bankAccounts.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = ["account_name", "customer_ID", "balance"];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

// Assigns a random amount of money to the account 100 - 500,000
function randomAmount() {
  const MIN = 100;
  const MAX = 500000;
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
}

async function bankAccountExist(req, res, next) {
  const { account_ID } = req.params;
  const bank_account = service.read(account_ID);
  if (bank_account) {
    res.locals.bank_account = bank_account;
    return next();
  }
  next({ status: 404, message: account_ID });
}

function hasValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidProperties = Object.keys(data).filter(
    (key) => !VALID_PROPERTIES.includes(key)
  );

  if (invalidProperties.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidProperties.join(", ")}`,
    });
  }
  next();
}

async function create(req, res, next) {
  try {
    const { data = {} } = req.body;
    data["balance"] = randomAmount();
    const createdBankAccount = service.create(data);
    res.status(201).json({ data: createdBankAccount });
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  const { bank_account } = res.locals;
  res.status(200).json({ data: bank_account });
}

module.exports = {
  create: [
    hasRequiredProperties,
    hasValidProperties,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(bankAccountExist), read],
};
