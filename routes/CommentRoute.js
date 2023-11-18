const exress = require("express");
const { add } = require("../controllers/CommentApi");

const router = exress.Router();

router.post("/add/:lead_id", add);
module.exports = router;
