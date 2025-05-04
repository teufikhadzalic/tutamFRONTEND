"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./dashboard.css"

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [stats, setStats] = useState({
    totalPrograms: 0,
    activePrograms: 0,
    completedWorkouts: 0,
  })

  useEffect(() => {
    // This would normally fetch data from the backend
    // For now, we'll use mock data
    setStats({
      totalPrograms: 5,
      activePrograms: 2,
      completedWorkouts: 12,
    })
  }, [])

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard, {user?.name || "User"}</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Programs</h3>
          <p className="stat-number">{stats.totalPrograms}</p>
        </div>
        <div className="stat-card">
          <h3>Active Programs</h3>
          <p className="stat-number">{stats.activePrograms}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Workouts</h3>
          <p className="stat-number">{stats.completedWorkouts}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/programs" className="dashboard-button">
          View My Programs
        </Link>
        <Link to="/programs/create" className="dashboard-button primary">
          Create New Program
        </Link>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <p>You completed "Leg Day" workout</p>
            <span className="activity-date">2 days ago</span>
          </div>
          <div className="activity-item">
            <p>You created a new program "Summer Shred"</p>
            <span className="activity-date">5 days ago</span>
          </div>
          <div className="activity-item">
            <p>You completed "Upper Body" workout</p>
            <span className="activity-date">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
