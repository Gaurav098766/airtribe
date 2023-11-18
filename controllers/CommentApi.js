const pool = require("../config/db");

exports.add = async (req, res) => {
  try {
    const { lead_id } = req.params;
    const { comment, instructor_id } = req.body;

    let query = "SELECT * FROM leads WHERE lead_id = $1";
    let values = [lead_id];
    let result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(403).json({
        success: false,
        error: "Invalid lead.",
      });
    }

    query = "SELECT * FROM courses WHERE course_id = $1";
    values = [result.rows[0].course_id];
    const temp = result.rows[0].course_id;
    result = await pool.query(query, values);

    if (result.rows[0].instructor_id !== parseInt(instructor_id)) {
      return res.status(403).json({
        success: false,
        error: "Instructor is not allowed to add comment for this lead.",
      });
    }

    query =
      "INSERT INTO comments (instructor_id, course_id, comment) VALUES ($1, $2, $3) RETURNING *";
    values = [instructor_id, temp, comment];
    result = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error posting comment", error);
    return res.status(400).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
