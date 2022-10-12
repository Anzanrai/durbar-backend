const crypto = require('crypto');

/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Anjan Rai
 * @since   2021
 */

/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
const successResponse = (message, results, statusCode) => {
  return {
    message,
    code: statusCode,
    data: results,
  };
};

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
const errorResponse = (message, statusCode) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
  };
};

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
const validationErrorResponse = (errors) => {
  let errorMessages = errors.array().map((errorObj) => {
    let key = errorObj.param;
    let computedObj = {};
    computedObj[key] = errorObj.msg;
    return computedObj;
  });
  return {
    message: 'Validation errors',
    code: 422,
    errorMessages,
  };
};

const generateRandomString = () => {
  return Crypto.randomBytes(24).toString('base64').slice(0, 10);
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  generateRandomString,
};
