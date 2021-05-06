const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomId();

    // step1: create salt
    const salt = crypto.randomBytes(8).toString("hex");

    // create a hashed password or buffer with salt added
    const buffer = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = { ...attrs, password: `${buffer.toString("hex")}.${salt}` };
    records.push(record);
    await this.writeAll(records);

    return record;
  }

  async comparepasswords(
    savedPassInTheDatabase,
    suppliedPassProvidedByTheUser
  ) {
    // saved password: hashed.salt
    // result below is an array contains two string: first is the hash and second is the salt
    const [hashed, salt] = savedPassInTheDatabase(".");

    const hashedSuppliedPassProvidedByTheUser = await scrypt(
      suppliedPassProvidedByTheUser,
      salt,
      64
    );

    return hashed === hashedSuppliedPassProvidedByTheUser;
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
  }
}

module.exports = new UsersRepository("users.json");
