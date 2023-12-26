import { Sequelize } from "sequelize";

const _db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    },
    // {
    //     production: {
    //         use_env_variable: "postgresql://c79842_maxportfel_na4u_ru:BuSfaWeyfodic60@postgres.c79842.h2/c79842_maxportfel_na4u_ru"
    //     }
    // }
)

export default _db