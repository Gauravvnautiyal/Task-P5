import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">DEV@Deakin</Link>
      <div className="search-box">
        <Search size={16} />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="nav-right">
        <Link to="/">Post</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;