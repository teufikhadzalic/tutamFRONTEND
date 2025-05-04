"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProgram.css";

const CreateProgram = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [exercises, setExercises] = useState([{ name: "", sets: 3, reps: 10, type: "strength", notes: "" }]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: 3, reps: 10, type: "strength", notes: "" }]);
  };

  const handleRemoveExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!title.trim()) {
      setError("Program title is required");
      return;
    }

    if (!goal.trim()) {
      setError("Program goal is required");
      return;
    }

    if (exercises.some((ex) => !ex.name.trim())) {
      setError("All exercises must have a name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/programs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, goal, exercises }),
      });

      if (!response.ok) {
        throw new Error("Failed to create program");
      }

      const data = await response.json();
      console.log("Program created:", data);

      
      navigate("/programs");
    } catch (err) {
      console.error("Error creating program:", err);
      setError("Failed to create program. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-program-container">
      <h1>Create New Workout Program</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="program-form">
        <div className="form-group">
          <label htmlFor="title">Program Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., 12-Week Strength Builder"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="goal">Program Goal</label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Build muscle and increase strength"
            required
          />
        </div>

        <h2>Exercises</h2>

        {exercises.map((exercise, index) => (
          <div key={index} className="exercise-item">
            <h3>Exercise {index + 1}</h3>

            <div className="exercise-form">
              <div className="form-group">
                <label htmlFor={`exercise-name-${index}`}>Exercise Name</label>
                <input
                  type="text"
                  id={`exercise-name-${index}`}
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                  placeholder="e.g., Barbell Squat"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`exercise-sets-${index}`}>Sets</label>
                  <input
                    type="number"
                    id={`exercise-sets-${index}`}
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, "sets", Number.parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`exercise-reps-${index}`}>Reps</label>
                  <input
                    type="number"
                    id={`exercise-reps-${index}`}
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, "reps", Number.parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={`exercise-type-${index}`}>Exercise Type</label>
                <select
                  id={`exercise-type-${index}`}
                  value={exercise.type}
                  onChange={(e) => handleExerciseChange(index, "type", e.target.value)}
                  required
                >
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="balance">Balance</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor={`exercise-notes-${index}`}>Notes (Optional)</label>
                <textarea
                  id={`exercise-notes-${index}`}
                  value={exercise.notes}
                  onChange={(e) => handleExerciseChange(index, "notes", e.target.value)}
                  placeholder="Additional instructions or notes"
                  rows="2"
                />
              </div>

              {exercises.length > 1 && (
                <button type="button" className="remove-exercise-button" onClick={() => handleRemoveExercise(index)}>
                  Remove Exercise
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="button" className="add-exercise-button" onClick={handleAddExercise}>
          Add Another Exercise
        </button>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => navigate("/programs")}>
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating..." : "Create Program"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProgram;
