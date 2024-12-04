import Joi from "joi";

const { validateRequest } = require("../../../../../utils/requestValidator");

const {
  getValueFromKey,
  setWithTtl,
} = require("../../../../../utils/commandHelper");

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

    await setWithTtl(`${body.name}-${body.email}`, 10);
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error, "ini loh");
    if (error instanceof Response) return error;

    return new Response(
      JSON.stringify({ message: "Internal Server Error", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req) {
  try {
    const value = await getValueFromKey("test");

    return new Response(JSON.stringify({ value }), {
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
