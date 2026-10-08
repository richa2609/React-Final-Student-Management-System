const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload, error: "" };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return { user: null, error: "" };
    default:
      return state;
  }
};

export default authReducer;
