const exress = require("express");
const { create, update, register } = require("../controllers/CourseApi");

const router = exress.Router();

router.post("/add/:lead_id", create);
module.exports = router;
