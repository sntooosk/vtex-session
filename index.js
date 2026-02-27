require("dotenv").config();

const { getAppToken } = require("./getAppToken");
const { createSession } = require("./createSession");

async function main() {
  try {
    const account = process.env.VTEX_ACCOUNT;
    const appkey = process.env.VTEX_APP_KEY;
    const apptoken = process.env.VTEX_APP_TOKEN;

    if (!account || !appkey || !apptoken) {
      throw new Error("Missing VTEX credentials in .env");
    }

    console.log(`Authenticating: ${account}`);

    const cookie = await getAppToken({
      account,
      appkey,
      apptoken,
    });

    console.log("\nSession Cookie:");
    console.log(cookie);

    createSession({
      account,
      login: appkey,
      token: cookie,
    });

    console.log("\nVTEX session created successfully");
  } catch (error) {
    console.error("\nError:");
    console.error(error.message);
  }
}

main();
