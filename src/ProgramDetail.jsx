"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import "./ProgramDetail.css"

const ProgramDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProgram()
  }, [id])

  const fetchProgram = async () => {
    try {
      // In a real app, this would fetch from the backend
      // const response = await getProgram(id);
      // setProgram(response.data);

      // For now, we'll use mock data
      setTimeout(() => {
        setProgram({
          id: Number.parseInt(id),
          title: "Strength Builder",
          goal: "Build muscle and increase overall strength",
          createdAt: "2023-04-15",
          exercises: [
            {
              id: 1,
              name: "Barbell Squat",
              sets: 4,
              reps: 8,
              type: "strength",
              notes: "Focus on form and depth",
            },
            {
              id: 2,
              name: "Bench Press",
              sets: 3,
              reps: 10,
              type: "strength",
              notes: "Keep elbows at 45 degrees",
            },
            {
              id: 3,
              name: "Deadlift",
              sets: 3,
              reps: 6,
              type: "strength",
              notes: "Maintain neutral spine",
            },
            {
              id: 4,
              name: "Pull-ups",
              sets: 3,
              reps: 8,
              type: "strength",
              notes: "Use assistance if needed",
            },
            {
              id: 5,
              name: "Plank",
              sets: 3,
              reps: 60,
              type: "strength",
              notes: "Hold for 60 seconds",
            },
          ],
        })
        setLoading(false)
      }, 500)
    } catch (err) {
      console.error("Error fetching program:", err)
      setError("Failed to load workout program.")
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        // In a real app, this would delete from the backend
        // await deleteProgram(id);

        // For now, we'll just navigate back
        navigate("/programs")
      } catch (err) {
        console.error("Error deleting program:", err)
        setError("Failed to delete program.")
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading program details...</div>
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Link to="/programs" className="back-link">
          Back to Programs
        </Link>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="not-found">
        <h2>Program Not Found</h2>
        <p>The workout program you're looking for doesn't exist.</p>
        <Link to="/programs" className="back-link">
          Back to Programs
        </Link>
      </div>
    )
  }

  return (
    <div className="program-detail-container">
      <div className="program-header">
        <h1>{program.title}</h1>
        <div className="program-actions">
          <button onClick={handleDelete} className="delete-button">
            Delete Program
          </button>
        </div>
      </div>

      <div className="program-info">
        <p className="program-goal">
          <strong>Goal:</strong> {program.goal}
        </p>
        <p className="program-date">
          <strong>Created:</strong> {program.createdAt}
        </p>
      </div>

      <div className="exercises-section">
        <h2>Exercises</h2>
        <div className="exercises-list">
          {program.exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-card">
              <div className="exercise-header">
                <h3>{exercise.name}</h3>
                <span className={`exercise-type ${exercise.type}`}>
                  {exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)}
                </span>
              </div>
              <div className="exercise-details">
                <p>
                  <strong>Sets:</strong> {exercise.sets}
                </p>
                <p>
                  <strong>Reps:</strong> {exercise.reps}
                </p>
                {exercise.notes && (
                  <p className="exercise-notes">
                    <strong>Notes:</strong> {exercise.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="back-section">
        <Link to="/programs" className="back-link">
          Back to Programs
        </Link>
      </div>
    </div>
  )
}

export default ProgramDetail
