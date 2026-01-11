const z = require("zod");
const mongoose = require("mongoose");

const paramSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, " User id required")
    .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid User Id"),
}).strict();

module.exports = { paramSchema };
