import { version, description } from '../../package.json';
import { config } from 'dotenv';
config();

export const apiConfig = {
  host: String(process.env.API_HOST),
  port: Number(process.env.API_PORT),
  swaggerConfig: {
    swaggerDefinition: {
      info: { title: 'TSLego Express Hello', version, description },
      host: `${String(process.env.API_HOST)}:${Number(process.env.API_PORT)}`,
      basePath: '/api',
    },
    apis: ['./src/user/**/*.ts'],
  },
};
