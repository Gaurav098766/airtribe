const exress = require('express');
const { 
        create,
        update,
        register 
    } = require('../controllers/CourseApi');

const router = exress.Router();

router
    .post('/create', create)
    .post('/register/:course_id',register)
    .patch('/update/:instructor_id/course/:course_id',update)


module.exports = router