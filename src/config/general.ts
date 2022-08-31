export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST || 'database',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        name: process.env.DATABASE_NAME || 'places',
        username: process.env.DATABASE_USERNAME || 'dev',
        password: process.env.DATABASE_PASSWORD || 'pass',
    },
    redis: {
        host: process.env.CACHE_HOST || 'cache',
        port: parseInt(process.env.CACHE_PORT, 10) || 6379,
        password: process.env.CACHE_PASSWORD || 'pass',
    },
});
