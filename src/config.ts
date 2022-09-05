import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mongo: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbName: process.env.MONGO_DB_NAME,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    nodemailer: {
      HOST: process.env.NODEMAILER_HOST,
      PORT: process.env.NODEMAILER_PORT || 25 || 587,
      USER: process.env.NODEMAILER_USER,
      PASS: process.env.NODEMAILER_PASS,
      ADMIN_MAIL: process.env.NODEMAILER_MAIL,
      MAIL_ADMIN_ECOMMERCE: process.env.NODEMAILER_MAIL_ADMIN_ECOMMERCE,
    },
  };
});
