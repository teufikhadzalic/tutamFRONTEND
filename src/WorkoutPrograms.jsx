import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPrograms } from "./api"; // Pastikan ini mengarah ke API yang benar
import "./WorkoutPrograms.css";

const WorkoutPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await getPrograms(); // Memanggil API backend
      setPrograms(response.data); // Simpan data ke state
      setLoading(false);
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError("Failed to load workout programs.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        // Tambahkan logika untuk menghapus program dari backend
        // await deleteProgram(id);

        // Perbarui state setelah penghapusan
        setPrograms(programs.filter((program) => program.id !== id));
      } catch (err) {
        console.error("Error deleting program:", err);
        setError("Failed to delete program.");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading programs...</div>;
  }

  return (
    <div className="programs-container">
      <div className="programs-header">
        <h1>My Workout Programs</h1>
        <Link to="/programs/create" className="create-button">
          Create New Program
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      {programs.length === 0 ? (
        <div className="no-programs">
          <p>You don't have any workout programs yet.</p>
          <Link to="/programs/create" className="create-link">
            Create your first program
          </Link>
        </div>
      ) : (
        <div className="programs-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <h3>{program.title}</h3>
              <p className="program-goal">{program.goal}</p>
              <p className="program-exercises">Exercises: {program.exercises.length}</p>
              <p className="program-date">Created: {new Date(program.createdAt).toLocaleDateString()}</p>
              <div className="program-actions">
                <Link to={`/programs/${program.id}`} className="view-button">
                  View Details
                </Link>
                <button onClick={() => handleDelete(program.id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutPrograms;