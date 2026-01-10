const z = require("zod");

const updateUserSchema = z.object({
  name: z.string().trim().min(3).optional(),
  email: z.email().optional(),
  role: z.enum(["user", "admin"]).optional(),
});

module.exports = {
  updateUserSchema,
};
