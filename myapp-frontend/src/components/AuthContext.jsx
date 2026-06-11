import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null); // Tambahkan state user
  const [loading, setLoading] = useState(true); // Tambahkan loading saat memverifikasi token
  // Opsional: Validasi token saat aplikasi dimuat
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
      }
      setLoading(false);
    };
    verifyToken();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
