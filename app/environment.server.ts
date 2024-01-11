import * as z from "zod";
import { pick } from "moderndash";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  KO_VERSION: z.string().min(1),
});

export const environment = () => environmentSchema.parse(process.env);

export const getPublicKeys = () => {
  return {
    publicKeys: pick(environment(), ["KO_VERSION"]),
  };
};
