const fs = require("fs");
const os = require("os");
const path = require("path");

function createSession({ account, login, token }) {
  const dir = path.join(os.homedir(), ".vtex", "session");

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, "session.json"),
    JSON.stringify(
      {
        account,
        login,
        token,
      },
      null,
      2,
    ),
  );

  console.log("VTEX CLI session saved");
}

module.exports = { createSession };
