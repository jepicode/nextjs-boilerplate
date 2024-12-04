const joi = require("joi");

/**
 * Helper untuk validasi request
 * @param {Object} schema - Skema Joi untuk validasi.
 * @param {Object} data - Data yang akan divalidasi.
 * @returns {Object} Data yang valid jika sesuai dengan skema.
 * @throws {Response} Respons 400 jika data tidak valid.
 */
const validateRequest = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    throw new Response(JSON.stringify({ message: "Bad Request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return value;
};

module.exports = { validateRequest}
