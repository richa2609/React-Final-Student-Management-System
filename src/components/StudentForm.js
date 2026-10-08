import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../redux/studentActions";

function StudentForm() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setImage] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [examType, setExamType] = useState("Class Exam");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Phone number should be 10 digits");
      return;
    }
    if (marks < 0 || marks > 100) {
      alert("Marks should be between 0 and 100");
      return;
    }

    const newStudent = {
      name: name,
      rollNo: Number(rollNo),
      phone: phone,
      email: email,
      age: Number(age),
      class: studentClass,
      grade: grade,
      image: image,
      subject: subject,
      marks: Number(marks),
      examType: examType,
    };

    dispatch(addStudent(newStudent));
    alert("Student added");
    navigate("/");
  };

  return (
    <div className="white-box p-4">
      <h3 className="mb-3">Add Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <input className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" type="number" placeholder="Roll Number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" placeholder="Class" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <input className="form-control" type="number" placeholder="Marks / 100" value={marks} onChange={(e) => setMarks(e.target.value)} required />
          </div>
          <div className="col-md-4 mb-3">
            <select className="form-select" value={examType} onChange={(e) => setExamType(e.target.value)}>
              <option>Class Exam</option>
              <option>Online Exam</option>
              <option>Missed Exam</option>
            </select>
          </div>
        </div>
        <button className="btn add-btn" type="submit">ADD NOW</button>
      </form>
    </div>
  );
}

export default StudentForm;
