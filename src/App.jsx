import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  const addStudent = () => {
    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    if (editId) {
      const updated = students.map((s) =>
        s.id === editId ? { ...s, name, email, age } : s
      
      );
      setStudents(updated);
      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name,
        email,
        age,
      };
      setStudents([...students, newStudent]);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  const editStudent = (student) => {
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setEditId(student.id);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const downloadExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(students);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  XLSX.writeFile(workbook, "students.xlsx");
};

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Students Table</h2>
      <button onClick={downloadExcel}>Download Excel</button>

      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button
          onClick={addStudent}
          style={{ marginLeft: "10px" }}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <button onClick={() => editStudent(s)}>Edit</button>

                <button
                  onClick={() => deleteStudent(s.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
