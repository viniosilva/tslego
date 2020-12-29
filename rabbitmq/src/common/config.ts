import { config } from 'dotenv';
config();

export const rabbitMqConfig = {
  host: String(process.env.RABBITMQ_HOST),
  port: Number(process.env.RABBITMQ_PORT),
  user: String(process.env.RABBITMQ_USER),
  password: String(process.env.RABBITMQ_PASSWORD),
};
