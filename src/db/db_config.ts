import dotenv from "dotenv";
dotenv.config();

import { Client, Pool } from "pg";

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

export const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: Number(PGPORT),
});
