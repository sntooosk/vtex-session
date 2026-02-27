async function getAppToken({ account, appkey, apptoken }) {
  const url = `https://${account}.myvtex.com/api/sessions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-VTEX-API-AppKey": appkey,
      "X-VTEX-API-AppToken": apptoken,
      "Content-Type": "application/json",
    },
    body: "{}",
  });

  if (!response.ok) {
    throw new Error(`VTEX API error: ${response.status}`);
  }

  const rawCookies = response.headers.get("set-cookie");

  if (!rawCookies) {
    throw new Error("No cookies returned");
  }

  const cookies = rawCookies.split(",");

  const sessionCookie = cookies.find((c) =>
    c.trim().startsWith("vtex_session"),
  );

  if (!sessionCookie) {
    throw new Error("vtex_session not found");
  }

  return sessionCookie.split(";")[0].trim();
}

module.exports = { getAppToken };
