const fs = require("fs");

class usersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("creating a repository require a filename");
    }

    this.filename = filename;
    // api below check to see if the file exist synchronously. because we only have one
    // instance of the userRepository we can use accessSync; otherwise, it usually not
    // recommended to use this way in production mode.
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      // if the file does not exist, use writeFileSync
      fs.writeFileSync(this.filename, "[]");
    }
  }

  //   READING THE CONTENT OF THE FILENAME:
  async getAll() {
    // open and read the this.filename and return the parsed value
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async create(attributes) {
    //   step1: get the records in the filesystem
    const records = await this.getAll();
    records.push(attributes);
    // write an updated records array back to this.filename
    await this.writeAll(records);
  }

  //   writeAll will JSON stringify the record. second null, 2 args are formatter
  // to make reading the JSON file more readable
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
}

// TESTS:
const test = async () => {
  // access to users repository
  const repo = new usersRepository("users.json");

  // testing create()
  await repo.create({
    email: "test1@gmail.com",
    password: "password",
    passwordConfirmation: "password",
  });

  // testing getAll() to get the records that being saved
  const users = await repo.getAll();
  console.log(users);
};

test();
