import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailView.module.css";
import { getStudentById } from "../../utils/constant/studentApi";

function DetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    if (id) {
      fetchStudentDetail();
    }
  }, [id]);

  async function fetchStudentDetail() {
    try {
      setLoading(true);
      setError(null);
      const response = await getStudentById(id);
      setStudent(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className={styles.loading}>Memuat detail data...</p>;
  if (error) return <p className={styles.error}>Gagal memuat data: {error}</p>;
  if (!student) return <p className={styles.error}>Siswa tidak ditemukan</p>;

  const BACKEND_URL = "http://localhost:3000/uploads/";
  const imageSrc = student.photo 
    ? `${BACKEND_URL}${student.photo}`
    : "https://picsum.photos/200/300";

  return (
    <div className={styles.page__container}>
      <div className={styles.detail__box}>
        <button className={styles.back__button} onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
        
        <h3 className={styles.detail__title}>Detail Informasi Siswa</h3>
        
        <div className={styles.detail__body}>
          <div className={styles.image__container}>
            <img 
              src={imageSrc} 
              alt={student.full_name} 
              className={styles.detail__image}
            />
          </div>
          
          <div className={styles.detail__info}>
            <div className={styles.info__group}>
              <label>Nama Lengkap</label>
              <p>{student.full_name}</p>
            </div>

            <div className={styles.info__group}>
              <label>Tanggal Lahir</label>
              <p>{student.birth_date}</p>
            </div>

            <div className={styles.info__group}>
              <label>Jenis Kelamin</label>
              <p>{student.gender === "L" ? "Laki-laki" : "Perempuan"}</p>
            </div>

            <div className={styles.info__group}>
              <label>ID Kelas (Class ID)</label>
              <p className={styles.badge__class}>{student.class_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
