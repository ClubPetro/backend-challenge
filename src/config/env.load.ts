interface ConfigProps {
  api: {
    port: number;
    prefix: string;
    baseUrl: string;
  };
  db: {
    connection: string;
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
    synchronize: boolean;
  };
  multer: {
    destinaton: string;
  };
}

const env: any = process.env;

export const envConfig: ConfigProps = {
  api: {
    baseUrl: env.API_BASE_URL || 'http://localhost',
    port: parseInt(env.SERVER_PORT, 10) || 3000,
    prefix: env.API_PREFIX || 'api/v1',
  },
  db: {
    connection: env.DB_CONNECTION,
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: parseInt(env.DB_PORT, 10) || 3306,
    synchronize: !!env.TYPEORM_SYNCHRONIZE,
  },
  multer: {
    destinaton: env.MULTER_DESTINATION,
  },
};
