const z = require("zod");
const mongoose = require("mongoose");

const paramSchema = z.object({
  id: z
    .string()
    .trim(1)
    .refine((val) => mongoose.Types.ObjectId.isValid(val)),
});

module.exports = { paramSchema };
