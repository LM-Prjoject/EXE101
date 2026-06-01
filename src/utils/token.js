function decodeJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function cleanToken(value) {
  if (!value) return null;

  let token = String(value).trim();

  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  token = token.replace(/^"|"$/g, "");

  return token || null;
}

function isWrongProjectToken(token) {
  const payload = decodeJwtPayload(token);
  if (!payload) return false;

  const issuer = String(payload.iss || "").toLowerCase();
  const scope = String(payload.scope || "").toLowerCase();

  return (
    issuer.includes("freshshop") ||
    scope.includes("customer") ||
    scope.includes("supplier")
  );
}

function findTokenInObject(obj) {
  if (!obj || typeof obj !== "object") return null;

  const token =
    obj.token ||
    obj.accessToken ||
    obj.authToken ||
    obj.jwt ||
    obj.access_token ||
    obj.data?.token ||
    obj.data?.accessToken ||
    obj.data?.access_token ||
    obj.user?.token ||
    obj.user?.accessToken ||
    obj.user?.access_token ||
    obj.currentUser?.token ||
    obj.currentUser?.accessToken ||
    obj.currentUser?.access_token;

  return cleanToken(token);
}

export function getToken() {
  const keys = [
    "exeToken",
    "hhToken",
    "exe_access_token",
    "accessToken",
    "authToken",
    "jwt",
    "access_token",
    "token",
    "user",
    "currentUser",
    "auth",
    "authUser",
    "userProfile",
  ];

  for (const storage of [localStorage, sessionStorage]) {
    for (const key of keys) {
      const raw = storage.getItem(key);
      if (!raw) continue;

      let token = null;

      try {
        const parsed = JSON.parse(raw);
        token =
          typeof parsed === "string"
            ? cleanToken(parsed)
            : findTokenInObject(parsed);
      } catch {
        token = cleanToken(raw);
      }

      if (token && !isWrongProjectToken(token)) {
        return token;
      }
    }
  }

  return null;
}