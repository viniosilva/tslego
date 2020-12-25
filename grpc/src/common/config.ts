import { config } from 'dotenv';
config();

export const apiConfig = {
  host: String(process.env.API_HOST),
  port: Number(process.env.API_PORT),
};
