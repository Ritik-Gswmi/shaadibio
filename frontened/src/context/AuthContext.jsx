import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // if token expired, clear it
  useEffect(() => {
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        try {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            logout();
          }
        } catch {}
      }
    }
  }, [token]);

  const login = ({ user: userData, token: jwt }) => {
    // include token on user object for convenience (legacy components may expect it)
    const enriched = { ...userData, token: jwt };
    setUser(enriched);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(enriched));
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};