import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, parseJwt } from "../api/auth";
import { SESSION_EXPIRED_EVENT } from "../api/client";
import { getUserById } from "../api/user";

const AuthContext = createContext(null);
const AUTH_TOKEN_KEY = "authToken";

function isExpiredUser(user) {
  return Boolean(user?.exp && user.exp * 1000 <= Date.now());
}

function getStoredToken() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const user = token ? parseJwt(token) : null;

  if (!token || !user || isExpiredUser(user)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return null;
  }

  return token;
}

function getStoredUser() {
  const token = getStoredToken();
  return token ? parseJwt(token) : null;
}

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(getStoredToken);
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const parsedUser = authToken ? parseJwt(authToken) : null;

    if (parsedUser && isExpiredUser(parsedUser)) {
      logout();
      redirectToLogin();
      return;
    }

    setCurrentUser(parsedUser);
    if (!authToken) setUserProfile(null);
  }, [authToken]);

  useEffect(() => {
    function handleSessionExpired() {
      logout();
      redirectToLogin();
    }

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, []);

  useEffect(() => {
    if (!currentUser?.exp) return undefined;

    const expiresInMs = Math.max(currentUser.exp * 1000 - Date.now(), 0);
    const timeoutId = window.setTimeout(() => {
      logout();
      redirectToLogin();
    }, expiresInMs);

    return () => window.clearTimeout(timeoutId);
  }, [currentUser?.exp]);

  // Fetch full profile from API whenever currentUser.id changes
  useEffect(() => {
    if (!currentUser?.id) {
      setUserProfile(null);
      return;
    }
    getUserById(currentUser.id)
      .then((data) => setUserProfile(data))
      .catch(() => setUserProfile(null));
  }, [currentUser?.id]);

  async function login(email, password) {
    const data = await loginUser(email, password);
    if (!data || !data.token) {
      throw new Error("Đăng nhập thất bại. Vui lòng thử lại.");
    }

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    setAuthToken(data.token);
    const parsed = parseJwt(data.token);
    setCurrentUser(parsed);
    return parsed;
  }

  async function register(name, email, password) {
    await registerUser(name, email, password);
    return true;
  }

  function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken(null);
    setCurrentUser(null);
    setUserProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, userProfile, authToken, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function redirectToLogin() {
  const authPages = ["/login", "/register"];

  if (!authPages.some((path) => window.location.pathname.startsWith(path))) {
    window.location.replace("/login");
  }
}
