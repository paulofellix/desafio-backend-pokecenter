import knex from 'knex';

const dbConnector = knex({
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) ?? 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    pool: {
      min: 2,
      max: 10,
      autostart: true,
      testOnBorrow: true,
    },
  },
});

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export default dbConnector;
