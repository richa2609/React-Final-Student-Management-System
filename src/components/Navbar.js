import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authActions";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark my-nav mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Student Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          {user ? (
            <ul className="navbar-nav ms-auto align-items-md-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Students</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-light btn-sm" onClick={handleLogout}>
                  Sign Out
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
