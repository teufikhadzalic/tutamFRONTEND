"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MentzerTrack</Link>
      </div>

      <div className="mobile-menu-button" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        {localStorage.getItem("token") ? (
          <>
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/programs" onClick={() => setMenuOpen(false)}>
                Workout Programs
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
