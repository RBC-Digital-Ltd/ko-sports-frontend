import * as z from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  KO_VERSION: z.string().min(1),
});

export const environment = () => environmentSchema.parse(process.env);
