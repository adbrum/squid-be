import { z } from "zod";

const envSchema = z.object({
  //GENERAL
  NODE_ENV: z
    .enum(["production", "development"])
    .optional()
    .default("development"),
  PORT: z.coerce.number().optional().default(3333),
  FRONTEND_ORIGIN: z.string(),
  
  //CMS
  CMS_URL: z.string().default(""),
  API_KEY: z.string().default(""),
});

/**
 * Parsed environment variables. Use this to access environment variables.
 */
export const envParser = envSchema.parse(process.env);
