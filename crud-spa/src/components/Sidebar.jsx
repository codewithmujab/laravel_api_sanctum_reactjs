import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div>
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
    </div>
  )
}
