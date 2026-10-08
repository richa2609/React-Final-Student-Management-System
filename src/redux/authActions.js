// login - checks email and password from json server
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        localStorage.setItem("user", JSON.stringify(found));
        dispatch({ type: "LOGIN_SUCCESS", payload: found });
        return true;
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "Wrong email or password" });
        return false;
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE", payload: "Server not running" });
      return false;
    }
  };
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  return { type: "LOGOUT" };
};
