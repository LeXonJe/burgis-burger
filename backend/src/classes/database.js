import PouchDB from 'pouchdb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  db;

  constructor(name) {
    const url = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}/` + name;

    this.db = new PouchDB(url);
  }

  async getDocs() {
    let list = [];

    const entries = await this.db.allDocs({ include_docs: true });

    // The allDocs function normally just gives us ids.
    // However, we want the actuall docs, so we include them an
    // filter them out.
    entries.rows.map((entry) => {
      list.push(entry.doc);
    });

    return list;
  }

  async get(key = '') {
    return await this.db.get(key);
  }

  async add(doc) {
    return await this.db.put(doc);
  }

  async delete(id) {
    return await this.db
      .get(id)
      .then((doc) => {
        return this.db.remove(doc);
      });
  }
}

export default Database;
