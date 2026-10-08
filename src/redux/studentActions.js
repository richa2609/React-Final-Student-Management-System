const URL = "http://localhost:5000/students";

// get all students
export const fetchStudents = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_STUDENTS_REQUEST" });
    try {
      const res = await fetch(URL);
      const data = await res.json();
      dispatch({ type: "FETCH_STUDENTS_SUCCESS", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
    }
  };
};

// add student
export const addStudent = (student) => {
  return async (dispatch) => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      const data = await res.json();
      dispatch({ type: "ADD_STUDENT", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
    }
  };
};

// update student (id is the unique thing)
export const updateStudent = (id, student) => {
  return async (dispatch) => {
    try {
      const res = await fetch(URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      const data = await res.json();
      dispatch({ type: "UPDATE_STUDENT", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
    }
  };
};

// delete student
export const deleteStudent = (id) => {
  return async (dispatch) => {
    try {
      await fetch(URL + "/" + id, { method: "DELETE" });
      dispatch({ type: "DELETE_STUDENT", payload: id });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
    }
  };
};
