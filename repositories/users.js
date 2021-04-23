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

  //   METHOD 1
  async getAll() {
    // open the this.filename
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });
    // Read its content
    console.log(contents);
    // Parse the content
    // Return the parsed data
  }
}

// Test1: test if getAll returns what is in the filename
const test = async () => {
  const repo = new usersRepository("users.json");

  await repo.getAll();
};

test();
