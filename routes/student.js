
const router = require('express').Router()

let students = [
    { id: 0, name: 'Dan' },
    { id: 1, name: 'Rohan' },
    { id: 2, name: 'Sol' },
    { id: 3, name: 'Ella' },
    { id: 4, name: 'Michael' },
    { id: 5, name: 'Karen' },
];

let tests = [
    { id: 0, subject: 'Physics', score: 99, studentId: 0 },
    { id: 1, subject: 'English', score: 78, studentId: 1 },
    { id: 2, subject: 'Math', score: 90, studentId: 3 },
    { id: 3, subject: 'English', score: 55, studentId: 3 },
    { id: 4, subject: 'Physics', score: 88, studentId: 4 },
]

function testsForStudent(id) {
    let studentTests = []
    tests.forEach((test) => {
        if (test.studentId === id) {
            studentTests.push(test);
        }
    })
    return studentTests;
}

function getAverageForStudent(testBank) {
    let sum = 0;
    testBank.forEach((test) => {
        sum += test.score;
    })
    return (sum / testBank.length);
}
//GET all our students
//"/student"
router.get('/', (req, res, next) => {
    res.json(students)
})

//GET students by id
router.get('/:id', (req, res, next) => {
    let testBank = testsForStudent(+req.params.id);
    let average = getAverageForStudent(testBank);
    students[req.params.id].average = average;
    //let test = tests.find(t => t.id === +req.params.id)
    res.json(students[req.params.id]);
    // let student = students.find(person => person.id === +req.params.id)
    // res.json(student)
})

// POST student
router.post('/', (req, res, next) => {
    let id = students.length + 1
    const { name } = req.body
    let student = { id, name }
    students.push(student)
    res.json(student)
})

//Delete a student
router.delete('/:id', (req, res, next) => {
    let newClass = students.filter(person => person.id !== +req.params.id)
    res.json(newClass)
})

// PUT student
router.put('/:id',(req,res, next) =>{
let updatedStudent = students.map(person => {
        if (person.id === +req.params.id) {
            person.name = req.body.name
            //return person
        }
        return person
    })
    res.json(updatedStudent)
})

module.exports = router
