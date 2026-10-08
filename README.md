# Student Management System

A small React project to manage students of a school. A teacher can log in, see all students, add new ones, edit them, delete them, and sort or filter the list.

The backend is a fake API made with json-server.

## Technologies Used

- React JS (Create React App)
- Redux, React-Redux and Redux Thunk
- React Router DOM
- Bootstrap 5
- json-server (fake backend)

## Features

- Login and Sign Out (only logged in users can see the pages)
- Show all students in a table
- Add a student (quick add bar at the top, or the full Add Student form)
- Edit a student
- Delete a student
- Sort by name or roll number
- Filter by class
- Tabs for All, Class Exam, Online Exam and Missed Exam
- Search by student name or subject
- Responsive navbar with Students, Add Student, Profile and Sign Out

## Folder Structure

```
student-management-system
|-- db.json                  (data for json-server)
|-- package.json
|-- public
|   `-- index.html
`-- src
    |-- index.js
    |-- App.js
    |-- App.css
    |-- components
    |   |-- Navbar.js
    |   |-- Login.js
    |   |-- PrivateRoute.js
    |   |-- StudentList.js
    |   |-- StudentForm.js
    |   `-- StudentDetails.js
    `-- redux
        |-- store.js
        |-- studentActions.js
        |-- studentReducer.js
        |-- authActions.js
        `-- authReducer.js
```

## How to Run

1. Open the project folder in the terminal and install the packages

   ```
   npm install
   ```

2. Start json-server (runs on port 5000)

   ```
   npm run server
   ```

3. Open a second terminal and start React (runs on port 3000)

   ```
   npm start
   ```

4. Open http://localhost:3000 in the browser

Both the server and React must be running, otherwise the students will not load.

## Login Details

| Email           | Password |
| --------------- | -------- |
| admin@gmail.com | 1234     |

## Pages

| Route      | Page                | Login needed |
| ---------- | ------------------- | ------------ |
| `/login`   | Login page          | No           |
| `/`        | Student list        | Yes          |
| `/add`     | Add student form    | Yes          |
| `/profile` | Teacher profile     | Yes          |

## API Routes (json-server)

| Method | URL                | What it does       |
| ------ | ------------------ | ------------------ |
| GET    | `/students`        | Get all students   |
| POST   | `/students`        | Add a new student  |
| PUT    | `/students/:id`    | Update a student   |
| DELETE | `/students/:id`    | Delete a student   |
| GET    | `/users`           | Used for login     |

## Student Data

Each student in `db.json` looks like this:

```json
{
  "id": 1,
  "name": "Richa Chouhan",
  "rollNo": 1,
  "phone": "9876543201",
  "email": "richa@gmail.com",
  "age": 8,
  "class": "3",
  "grade": "B",
  "image": "",
  "subject": "IT",
  "marks": 89,
  "examType": "Class Exam"
}
```

The `db.json` file has 50 students already added, so the list, sorting and filters can be tested properly.

## How Redux is Used

- `studentActions.js` has the thunks: `fetchStudents`, `addStudent`, `updateStudent`, `deleteStudent`
- `studentReducer.js` keeps the students list, loading and error
- `authActions.js` and `authReducer.js` handle login and logout
- The logged in user is also saved in localStorage so the login stays after refresh

## Notes

- The `id` of a student is used to find the correct student while updating and deleting.
- If the image field is empty, a random profile picture is shown, so internet is needed for the pictures.
- Passwords are saved as normal text in `db.json`. This is okay for a practice project but not for a real website.

## Output

Click this Link : https://drive.google.com/drive/folders/1FgmrG2JbaGJCadztVv19pvojW3i202jX?usp=sharing


