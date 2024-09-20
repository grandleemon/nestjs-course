import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs("profile", () => ({
  apiKey: process.env.PROFILE_API_KEY,
}));
