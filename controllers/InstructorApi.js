const pool = require("../config/db");

exports.search = async (req, res) => {
  try {
    const { name, email } = req.query;
    const value = [];

    if (!name && !email) {
      return res.status(400).json({
        success: false,
        error: "Search query is Required!",
      });
    }

    if (name) value.push(name);
    else if (email) value.push(email);

    const query = "SELECT * FROM leads WHERE name ILIKE $1 OR email ILIKE $1";
    const values = [`%${value[0]}%`];

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: "No leads found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error searching Leads: ", error);
    return res.status(400).json({
      succees: false,
      error: "Internal Server Error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { lead_id } = req.params;
    const { status, instructor_id } = req.body;
    const allowed_status = ["Accept", "Reject", "Waitlist"];

    if (!allowed_status.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Status. Allowed status are Accept, Reject, Waitlist.",
      });
    }

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
    result = await pool.query(query, values);

    if (result.rows[0].instructor_id !== parseInt(instructor_id)) {
      return res.status(403).json({
        success: false,
        error: "Instructor is not allowed to update status of this lead.",
      });
    }

    query = "UPDATE leads SET status = $1 WHERE lead_id = $2 RETURNING *";
    values = [status, lead_id];
    result = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error Updating Lead status", error);
    return res.status(400).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
