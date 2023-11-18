const exress = require("express");
const { search, update } = require("../controllers/InstructorApi");

const router = exress.Router();

router.get("/search/:instructor_id", search).patch("/update/:lead_id", update);

module.exports = router;
