const z = require("zod");
const mongoose = require("mongoose");

const paramSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "No Params")
    .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid Params"),
});

module.exports = { paramSchema };
