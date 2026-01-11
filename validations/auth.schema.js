const z = require("zod");

const registerSchema = z.object({
  name: z.string().trim().min(3, "name is too short"),
  email: z.email(),
  password: z.string().trim().min(6, "password is too short"),
}).strict();

const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string().trim().min(6, "password is too short"),
}).strict();

module.exports = {
  registerSchema,
  loginSchema,
};
