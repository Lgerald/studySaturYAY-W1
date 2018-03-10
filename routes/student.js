
const router = require('express').Router()

let students = [
    { id: 0, name: 'Dan' },
    { id: 1, name: 'Rohan' },
    { id: 2, name: 'Sol' },
    { id: 3, name: 'Ella' },
    { id: 4, name: 'Michael' },
    { id: 5, name: 'Karen' },
];


//GET all our students
//"/student"
router.get('/', (req, res, next) => {
    res.json(students)
})

//GET students by id
router.get('/:id', (req, res, next) => {

    let student = students.find(person => person.id === +req.params.id)
    res.json(student)
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
