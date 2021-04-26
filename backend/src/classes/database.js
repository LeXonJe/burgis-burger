import PouchDB from 'pouchdb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  db;
  loaded = false;
  loader = [];

  constructor(name) {
    this.db = new PouchDB(
      `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}/` + name
    );
    this.loadListeners();
  }

  onLoad(func) {
    if (this.loaded) func.call(this);
    else this.loader.push(func);
  }

  loadListeners() {
    this.loaded = true;
    this.loader.map((func) => func.call(this));
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

  update(id, updater) {
    this.db
      .get(id)
      .then((doc) => {
        return db.put(updater.call(doc));
      })
      .catch((err) => {
        throw err;
      });
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
