import { createContext, useState, useEffect } from "react";
import { getStudents } from "../utils/constant/studentApi";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [error, setError] = useState(null);     // Tambahkan state error
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getStudents();
      setStudents(response.data.data || response.data); 
    } catch (error) {
      console.error("Gagal mengambil data siswa:", error);
      setError(error.message || "Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, fetchStudents, loading, error }}>
      {children}
    </StudentContext.Provider>
  );
};
