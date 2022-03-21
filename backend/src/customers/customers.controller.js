const service = require("./customers.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
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
  const { data = {} } = req.body;
  const customer = data;
  const createdCustomer = await service.create(customer);
  res.status(201).json({ data: createdCustomer });
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
    asyncErrorBoundary(create),
  ],
};
