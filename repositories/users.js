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
}

// Test1: test if getAll returns what is in the filename
const test = async () => {
  const repo = new usersRepository("users.json");
  const users = await repo.getAll();
  console.log(users);
};

test();
