import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./navbar" // Perbaiki jalur impor
import Welcome from "./welcome" // Perbaiki jalur impor
import Login from "./login" // Perbaiki jalur impor
import Dashboard from "./Dashboard" // Perbaiki jalur impor
import WorkoutPrograms from "./WorkoutPrograms" // Perbaiki jalur impor
import CreateProgram from "./CreateProgram" // Perbaiki jalur impor
import ProgramDetail from "./ProgramDetail" // Perbaiki jalur impor
import ProtectedRoute from "./ProtectedRoute" // Perbaiki jalur impor
import "./App.css"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programs"
            element={
              <ProtectedRoute>
                <WorkoutPrograms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programs/create"
            element={
              <ProtectedRoute>
                <CreateProgram />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programs/:id"
            element={
              <ProtectedRoute>
                <ProgramDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
