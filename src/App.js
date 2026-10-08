import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <StudentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <StudentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

// small profile page, not much here
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="white-box p-4">
      <h3>{user.name}</h3>
      <p>{user.school}</p>
      <p>{user.email}</p>
    </div>
  );
}

export default App;
