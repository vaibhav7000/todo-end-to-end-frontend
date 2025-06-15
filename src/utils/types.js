import { z } from "zod/v4"

const titleSchema = z.string().trim().min(1);
const descriptionSchema = z.string().trim().min(1);

export { titleSchema, descriptionSchema }