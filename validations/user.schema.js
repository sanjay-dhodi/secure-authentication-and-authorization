const z = require("zod");

const updateUserSchema = z
  .object({
    name: z.string().trim().min(3).optional(),
    email: z.email().trim().optional(),
    role: z.enum(["user", "admin"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, "No data for update ")
  .strict();

module.exports = {
  updateUserSchema,
};
