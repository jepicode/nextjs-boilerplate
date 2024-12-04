import Joi from "joi";

const { validateRequest } = require("../../../../../utils/requestValidator");

const { queryAsync } = require("../../../../../utils/queryHelper");

export async function POST(req) {
  try {
    const body = await req.json();

    await validateRequest(
      Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      }),
      body
    );

    await queryAsync("INSERT INTO users (name, email) VALUES(?, ?)", [
      body.name,
      body.email,
    ]);

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Response) return error;

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  try {
    const rows = await queryAsync("SELECT * FROM users");

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Response) return error;

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
