import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../utils/constant/http"; // Sesuaikan path http Anda
import styles from "./Register.module.css";

function Register() {
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
      // Menggabungkan data input dengan role yang dikunci sebagai "user"
      const payload = {
        email: formData.email,
        password: formData.password,
        role: "user", // Dijamin aman diset ke user dari sisi frontend
      };

      // Mengirimkan request POST ke endpoint backend Express /register via proxy Vite
      const response = await http.post("/register", payload);

      if (response.status === 201 || response.status === 200) {
        alert("Pendaftaran berhasil! Silakan login.");
        navigate("/login"); // Diarahkan ke halaman login setelah sukses
      }
    } catch (err) {
      // Menangkap pesan eror kustom jika dikirim oleh AuthController.register backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Gagal mendaftar, email mungkin sudah digunakan atau periksa koneksi Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register Form</h2>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email baru"
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
              placeholder="Buat password minimal 6 karakter"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Sedang Memproses..." : "Register"}
          </button>
        </form>

        <p className={styles.linkText}>
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
