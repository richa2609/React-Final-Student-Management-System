import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authActions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await dispatch(loginUser(email, password));
    if (ok) {
      navigate("/");
    }
  };

  return (
    <div className="white-box p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h3>Sign In</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn add-btn w-100">Sign In</button>
      </form>
      <p className="mt-3 small text-muted">admin@gmail.com / 1234</p>
    </div>
  );
}

export default Login;
