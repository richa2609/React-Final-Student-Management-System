import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStudent, deleteStudent } from "../redux/studentActions";

// this is one row of the table
function StudentDetails({ student }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(student.name);
  const [subject, setSubject] = useState(student.subject);
  const [marks, setMarks] = useState(student.marks);
  const [examType, setExamType] = useState(student.examType);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    const updated = {
      ...student,
      name: name,
      subject: subject,
      marks: Number(marks),
      examType: examType,
    };
    dispatch(updateStudent(student.id, updated));
    setEdit(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this student?")) {
      dispatch(deleteStudent(student.id));
    }
  };

  const imgSrc = student.image ? student.image : "https://i.pravatar.cc/50?u=" + student.id;

  if (edit) {
    return (
      <tr>
        <td><input className="form-control form-control-sm" value={name} onChange={(e) => setName(e.target.value)} /></td>
        <td><input className="form-control form-control-sm" value={subject} onChange={(e) => setSubject(e.target.value)} /></td>
        <td><input className="form-control form-control-sm" type="number" value={marks} onChange={(e) => setMarks(e.target.value)} /></td>
        <td>
          <select className="form-select form-select-sm" value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option>Class Exam</option>
            <option>Online Exam</option>
            <option>Missed Exam</option>
          </select>
        </td>
        <td>
          <button className="btn btn-sm btn-success me-1" onClick={handleUpdate}>Save</button>
          <button className="btn btn-sm btn-secondary" onClick={() => setEdit(false)}>Cancel</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src={imgSrc} alt="student" width="40" height="40" className="rounded-circle me-3" />
          <div>
            <div className="student-name">{student.name}</div>
            <small className="text-muted">Grade {student.class}</small>
          </div>
        </div>
      </td>
      <td className="text-muted">{student.subject}</td>
      <td className="text-muted">{student.marks} / 100</td>
      <td className={student.examType === "Missed Exam" ? "text-danger" : ""}>{student.examType}</td>
      <td>
        <span className="edit-link me-3" onClick={() => setEdit(true)}>Edit</span>
        <span className="text-danger" style={{ cursor: "pointer" }} onClick={handleDelete}>Delete</span>
      </td>
    </tr>
  );
}

export default StudentDetails;
