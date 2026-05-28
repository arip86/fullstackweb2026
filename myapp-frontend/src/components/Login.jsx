import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Login.module.css";

function Login() {
 
  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

  
    if (!formData.email || !formData.password) {
      setError("Email dan password wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      // Mengirim payload ke backend (sekarang membawa { email, password })
      const response = await http.post("/login", formData);
      const result = response.data;

      if (result.token) {
        localStorage.setItem("token", result.token); 
        alert("Login Berhasil!");
        navigate("/"); 
      } else {
        setError("Token tidak ditemukan dalam respon server.");
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Gagal masuk, periksa koneksi atau akun Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login Form</h2>
        
        {error && <div className={styles.errorBox}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Username / Email</label>
            {/* 3. REVISI: Ubah id, name, dan value ke 'email' */}
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email anda"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Mohon Tunggu..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
