import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import url from "url";

const router = Router();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dataPath = path.join(__dirname, "../../data.json");

function loadData() {
  const raw = readFileSync(dataPath, "utf8");
  return JSON.parse(raw);
}

function saveData(data: any) {
  writeFileSync(dataPath, JSON.stringify(data, null, 2));
}


// GET all students

router.get("/students", (req, res) => {
  const data = loadData();
  res.json(data.students);
});


// GET student by roll number

router.get("/students/:roll", (req, res) => {
  const roll = Number(req.params.roll);
  const data = loadData();

  const student = data.students.find((s: any) => s.roll === roll);
  if (!student) return res.status(404).json({ error: "Student not found" });

  res.json(student);
});


// ADD new student

router.post("/students", (req, res) => {
  const { roll, name, grade } = req.body;

  if (!roll || !name || !grade)
    return res.status(400).json({ error: "roll, name, grade required" });

  const data = loadData();

  const exists = data.students.some((s: any) => s.roll === roll);
  if (exists) return res.status(400).json({ error: "Roll already exists" });

  const newStudent = { roll, name, grade };

  data.students.push(newStudent);
  saveData(data);

  res.json(newStudent);
});


// UPDATE student by roll number

router.put("/students/:roll", (req, res) => {
  const roll = Number(req.params.roll);
  const { name, grade } = req.body;

  const data = loadData();
  const index = data.students.findIndex((s: any) => s.roll === roll);

  if (index === -1)
    return res.status(404).json({ error: "Student not found" });

  if (name) data.students[index].name = name;
  if (grade) data.students[index].grade = grade;

  saveData(data);
  res.json(data.students[index]);
});

// DELETE student

router.delete("/students/:roll", (req, res) => {
  const roll = Number(req.params.roll);

  const data = loadData();
  const index = data.students.findIndex((s: any) => s.roll === roll);

  if (index === -1)
    return res.status(404).json({ error: "Student not found" });

  const removed = data.students.splice(index, 1)[0];
  saveData(data);

  res.json({ deleted: removed });
});

export default router;
