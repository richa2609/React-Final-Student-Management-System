import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent } from "../redux/studentActions";
import StudentDetails from "./StudentDetails";

function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);
  const user = JSON.parse(localStorage.getItem("user"));

  // filters and sorting
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [classFilter, setClassFilter] = useState("All");

  // quick add bar (same as the design)
  const [qName, setQName] = useState("");
  const [qSubject, setQSubject] = useState("");
  const [qMarks, setQMarks] = useState("");
  const [qExam, setQExam] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleQuickAdd = () => {
    if (qName === "" || qSubject === "" || qMarks === "" || qExam === "") {
      alert("Please fill all the fields");
      return;
    }
    const newStudent = {
      name: qName,
      rollNo: students.length + 1,
      phone: "",
      email: "",
      age: 8,
      class: "3",
      grade: "A",
      image: "",
      subject: qSubject,
      marks: Number(qMarks),
      examType: qExam,
    };
    dispatch(addStudent(newStudent));
    setQName("");
    setQSubject("");
    setQMarks("");
    setQExam("");
  };

  // filtering
  let list = students.filter((s) => {
    if (tab !== "All" && s.examType !== tab) return false;
    if (classFilter !== "All" && s.class !== classFilter) return false;
    if (search !== "") {
      const text = search.toLowerCase();
      if (!s.name.toLowerCase().includes(text) && !s.subject.toLowerCase().includes(text)) {
        return false;
      }
    }
    return true;
  });

  // sorting
  list = [...list];
  if (sortBy === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "rollNo") {
    list.sort((a, b) => a.rollNo - b.rollNo);
  }

  // for the class dropdown
  const allClasses = [];
  students.forEach((s) => {
    if (!allClasses.includes(s.class)) allClasses.push(s.class);
  });

  // for the numbers in the header
  const allSubjects = [];
  students.forEach((s) => {
    if (!allSubjects.includes(s.subject)) allSubjects.push(s.subject);
  });

  return (
    <div className="white-box">
      {/* purple header */}
      <div className="top-header d-flex align-items-center flex-wrap p-4 text-white">
        <img src="https://i.pravatar.cc/90?u=teacher" alt="teacher" width="80" height="80" className="rounded-circle me-3" />
        <div className="me-auto">
          <h4 className="mb-0">{user.name}</h4>
          <small>{user.school}</small>
        </div>
        <div className="d-flex text-center">
          <div className="me-4"><h5 className="mb-0">{students.length}</h5><small>Students</small></div>
          <div className="me-4"><h5 className="mb-0">{allSubjects.length}</h5><small>Subjects</small></div>
          <div><h5 className="mb-0">{students.length}</h5><small>Exams</small></div>
        </div>
      </div>

      {/* quick add bar */}
      <div className="add-bar d-flex align-items-end flex-wrap p-3">
        <div className="me-3 mb-2">
          <small className="text-muted">Student's Name</small>
          <input className="form-control grey-input" value={qName} onChange={(e) => setQName(e.target.value)} />
        </div>
        <div className="me-3 mb-2">
          <small className="text-muted">Subject</small>
          <input className="form-control grey-input" value={qSubject} onChange={(e) => setQSubject(e.target.value)} placeholder="Subject" />
        </div>
        <div className="me-3 mb-2">
          <small className="text-muted">Marks Scored</small>
          <input className="form-control grey-input" type="number" value={qMarks} onChange={(e) => setQMarks(e.target.value)} placeholder="00 / 00" />
        </div>
        <div className="me-3 mb-2">
          <small className="text-muted">Type of Exam</small>
          <select className="form-select grey-input" value={qExam} onChange={(e) => setQExam(e.target.value)}>
            <option value="">Select from list</option>
            <option>Class Exam</option>
            <option>Online Exam</option>
            <option>Missed Exam</option>
          </select>
        </div>
        <button className="btn add-btn mb-2" onClick={handleQuickAdd}>ADD NOW</button>
      </div>

      <div className="p-4">
        {/* tabs, sort, class filter, search */}
        <div className="d-flex align-items-center flex-wrap mb-3">
          <span className={tab === "All" ? "tab active-tab" : "tab"} onClick={() => setTab("All")}>All</span>
          <span className={tab === "Class Exam" ? "tab active-tab" : "tab"} onClick={() => setTab("Class Exam")}>Class Exam</span>
          <span className={tab === "Online Exam" ? "tab active-tab" : "tab"} onClick={() => setTab("Online Exam")}>Online Exam</span>
          <span className={tab === "Missed Exam" ? "tab active-tab" : "tab"} onClick={() => setTab("Missed Exam")}>Missed Exam</span>

          <div className="ms-auto d-flex flex-wrap">
            <select className="form-select form-select-sm me-2 mb-1" style={{ width: "auto" }} value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
              <option value="All">All Classes</option>
              {allClasses.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
            <select className="form-select form-select-sm me-2 mb-1" style={{ width: "auto" }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="rollNo">Sort by Roll No</option>
            </select>
            <input className="form-control form-control-sm mb-1" style={{ width: "200px", borderRadius: "20px" }} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr className="small text-muted">
                <th>Name</th>
                <th>Subject</th>
                <th>Marks Scored</th>
                <th>Type of Exam</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((student) => (
                <StudentDetails key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && !loading && <p className="text-center text-muted">No students found</p>}
      </div>
    </div>
  );
}

export default StudentList;
