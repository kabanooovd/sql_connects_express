import { v4 } from "uuid";
import { pool } from "./db_config";

class DbMethpds {
  async getTableData(tableName: string) {
    const sql_query = `SELECT * FROM ${tableName}`;
    try {
      const { rows, rowCount } = await pool.query(sql_query);
      return { quantity: rowCount, tableData: rows };
    } catch (error) {
      return null;
    }
  }
  async getItemById(tableName: string, itemId: string) {
    const sql_query = `SELECT * FROM ${tableName} WHERE id=${itemId}`;
    try {
      const { rows } = await pool.query(sql_query);
      return rows;
    } catch (err) {
      return null;
    }
  }
  async addItem(dto: any, tableName: string) {
    const sql_query = `INSERT INTO progers(name, email, age) VALUES('${dto.name}', '${dto.email}', ${dto.age})`;
    try {
      await pool.query(sql_query);
      return dto;
    } catch (err) {
      return null;
    }
  }
  async updateItem(dto: any, tableName: string, itemId: string) {
    const sql_query = `UPDATE ${tableName} SET name='${dto.name}', email='${dto.email}', age=${dto.age} WHERE id=${itemId}`;
    try {
      const currentItem = await this.getItemById(tableName, itemId);
      if (!currentItem?.length) {
        return null;
      }
      await pool.query(sql_query);
      return dto;
    } catch (err) {
      return null;
    }
  }
  async removeItemById(tableName: string, id: string) {
    const sql_query = `DELETE FROM ${tableName} WHERE id=${id}`;
    try {
      const { rows, rowCount } = await pool.query(sql_query);
      if (rowCount === 0) {
        return null;
      }
      return rows;
    } catch (err) {
      return null;
    }
  }
}

export default new DbMethpds();
