const service = require("./customers.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const bcrypt = require("bcryptjs");
const SALT = 5;
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "username",
  "email",
  "password",
];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

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
async function hashPassword(req, res, next) {
  try {
    const { data = {} } = req.body;
    const { password = "" } = data;
    const hash = await bcrypt.hash(password, SALT);
    if (hash) {
      console.log("data: ", data);
      const dataCopy = { ...data, password: hash };
      console.log("datacopy: ", dataCopy);
      res.locals.data = dataCopy;
      return next();
    } else {
      next({
        status: 404,
        message: "Error hasing password, please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
}

// Rather than get using customer_ID, this will get using username
async function customerExists(req, res, next) {
  const { username } = req.params;
  const customer = await service.read(username);
  if (customer) {
    res.locals.customer = customer;
    return next();
  }
  next({ status: 404, message: `Customer: ${username} does not exist` });
}

async function read(req, res, next) {
  const { customer } = res.locals;
  return res.status(201).json({ data: customer });
}

async function create(req, res, next) {
  try {
    const { data } = res.locals;
    const createdCustomer = await service.create(data);
    res.status(201).json({ data: createdCustomer });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  res.status(201).json({ data: await service.list() });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(customerExists), asyncErrorBoundary(read)],
  create: [
    hasValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(hashPassword),
    asyncErrorBoundary(create),
  ],
};
