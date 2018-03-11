const router = require('express').Router()

// Create Student Models
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

//GET all test
router.get('/', (req, res, next) => {
    res.json(tests)
})

//GET test by Id
router.get('/:id', (req, res, next) => {
    let test = tests.find(t => t.id === +req.params.id)
    res.json(test)
})

//POST score
router.post('/', (req, res, next) => {
    let id = tests.length + 1
    const { score, studentId, subject } = req.body
    let test = { studentId, id, score, subject }
    tests.push(test)
    res.json(tests)

})

//DELETE score
router.delete('/:id', function (req, res, next) {
    let newScores = tests.filter(score => score.id != req.params.id)
    tests = newScores;
    res.json({ tests })
})

//UPDATE score
router.put('/:id', function (req, res, next) {
    /* another potential way:
        let updatedScore = tests.filter(score => score.id === req.params.id)[0];
        updatedScore.score = req.body.score;
        updatedScore.studentId = req.body.studentId;
        updatedScore.subject = req.body.subject;
        tests[req.params.id] = updatedScore;
    */
    let updatedTests = tests.map(test => {
        if (test.id === +req.params.id) {
            test.score = req.body.score || test.score
            test.subject = req.body.subject || test.subject
            test.studentId = req.body.studentId || test.studentId
            return test
        } else {
            return test
        }
    })
    res.json({ updatedTests })
})

//GET mean Score for student
router.get('/mean/:id', function (req, res, next) {
    //can use filter, but I prefer find, cause it stops @ the first instance instead of returning an array
    let studentTests = tests.filter(test => test.studentId === +req.params.id)
    let total = studentTests.reduce((acc, test, idx) => {
        return acc + test.score
    }, 0);
    let mean = total / (studentTests.length);
    res.json({ mean })
})

//GET top Scoring student
//SPOILER ALERT: this one wont work, unless its moved above the get test by Id route, because thats how these work
router.get('/top', function (req, res, next) {
    // reduce array of tests
    let topScore = tests.reduce((prev, current, idx) => {
        return (prev.score > current.score) ? prev : current
    })
    // find assoc student
    let validictorian = students.filter(student => student.id === topScore.studentId);
    res.json({ validictorian })
})

module.exports = router
