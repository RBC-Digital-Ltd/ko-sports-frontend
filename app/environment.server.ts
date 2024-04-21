import * as z from "zod";
import { pick } from "moderndash";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  KO_VERSION: z.string().min(1).default("0.0.0-local"),
  DOMAIN: z.string().min(1).default(""),
  CLIENT_ID: z.string().min(1).default(""),
  CLIENT_SECRET: z.string().min(1).default(""),
});

export const environment = () => environmentSchema.parse(process.env);

export const getPublicKeys = () => {
  return {
    publicKeys: pick(environment(), [
      "KO_VERSION",
      "DOMAIN",
      "CLIENT_ID",
      "CLIENT_SECRET",
    ]),
  };
};
