import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./navbar" 
import Welcome from "./welcome" 
import Login from "./login" 
import Dashboard from "./dashboard" 
import WorkoutPrograms from "./WorkoutPrograms" 
import CreateProgram from "./CreateProgram" 
import ProgramDetail from "./ProgramDetail"
import ProtectedRoute from "./ProtectedRoute" 
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
