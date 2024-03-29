import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export const getPort = () => getEnvVar<number>("PORT", "number");
export const getNodeEnv = () => getEnvVar<string>("NODE_ENV", "string");
export const getCorsOrigin = () => getEnvVar<string>("CORS_ORIGIN", "string");
export const getMongoURI = () => getEnvVar<string>("MONGO_URI", "string");
export const getTokenKey = () => getEnvVar<string>("TOKEN_KEY", "string");

function getEnvVar<T extends string | number>(
  key: string,
  type: "string" | "number"
): T {
  const value = process.env[key];
  if (value == null) {
    throw new Error(
      `Unknown process.env.${key}: ${value}. Is your .env file setup?`
    );
  }

  if (type === "number") {
    const numValue = parseInt(value);
    if (Number.isNaN(numValue)) {
      throw new Error(`process.env.${key} must be a number. Got ${value}`);
    }
    return numValue as T;
  }

  return value as T;
}
