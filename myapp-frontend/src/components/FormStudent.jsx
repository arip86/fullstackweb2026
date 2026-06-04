import { useState } from "react";
import styles from "./FormStudent.module.css";
import { createStudent } from "../../utils/constant/studentApi";

function FormStudent() {
  const [formData, setFormData] = useState({
    full_name: "",
    birth_date: "",
    gender: "L",
    class_id: "",
    photo: null 
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData({ 
      ...formData, 
      [name]: files ? files[0] : value 
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.full_name.trim()) {
      alert("Nama Lengkap tidak boleh kosong!");
      return;
    }

    if (!formData.birth_date) {
      alert("Tanggal Lahir harus diisi!");
      return;
    }
    if (formData.gender !== "L" && formData.gender !== "P") {
      alert("Jenis Kelamin yang dipilih tidak valid!");
      return;
    }
    if (!formData.class_id) {
      alert("ID Kelas tidak boleh kosong!");
      return;
    }
    if (isNaN(formData.class_id) || Number(formData.class_id) <= 0) {
      alert("ID Kelas harus berupa angka positif!");
      return;
    }
    if (formData.photo && !formData.photo.type.startsWith("image/")) {
      alert("Berkas yang diunggah harus berupa file gambar (JPG/PNG)!");
      return;
    }

    try {
      setLoading(true);

      const dataToSend = new FormData();
      dataToSend.append("full_name", formData.full_name);
      dataToSend.append("birth_date", formData.birth_date);
      dataToSend.append("gender", formData.gender);
      dataToSend.append("class_id", formData.class_id);
      
      if (formData.photo) {
        dataToSend.append("photo", formData.photo);
      }

      const response = await createStudent(dataToSend);
      
      alert("Data siswa berhasil ditambahkan!");
      console.log("Response backend:", response.data);

      setFormData({
        full_name: "",
        birth_date: "",
        gender: "L",
        class_id: "",
        photo: null
      });

      // Reload halaman otomatis agar komponen list mengambil data gambar yang baru
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal menambahkan data siswa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.form__section}>
        <h2>Tambah Siswa Baru</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form__group}>
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              disabled={loading}
            />
          </div>

          <div className={styles.form__group}>
            <label>Tanggal Lahir</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className={styles.form__group}>
            <label>Jenis Kelamin</label>
            <select name="gender" 
            value={formData.gender} onChange={handleChange} disabled={loading}>
              <option value="L">Laki-laki</option> 
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className={styles.form__group}>
            <label>ID Kelas (Class ID)</label>
            <input
              type="number"
              name="class_id"
              value={formData.class_id}
              onChange={handleChange}
              placeholder="Contoh: 1"
              disabled={loading}
            />
          </div>

          <div className={styles.form__group}>
            <label>Upload Foto</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.form__button} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Siswa"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default FormStudent;
