const pool = require("../config/db");

exports.create = async (req, res) => {
  try {
    const { instructor_id, title, description, max_seats, start_date } =
      req.body;

    let data =
      "INSERT INTO courses (instructor_id, title, description, max_seats,start_date) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let values = [instructor_id, title, description, max_seats, start_date];
    let result = await pool.query(data, values);
    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating course: ", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { course_id, instructor_id } = req.params;
    const { title, max_seats, start_date, description } = req.body;

    // Check if the course and instructor exist
    let query =
      "SELECT * FROM courses WHERE course_id = $1 AND instructor_id = $2";
    let values = [course_id, instructor_id];
    let result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(403).json({
        success: false,
        error: "Invalid course or instructor.",
      });
    }

    // Build the dynamic UPDATE query based on the provided fields
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (title) {
      updateFields.push(`title = $${paramCount++}`);
      updateValues.push(title);
    }
    if (max_seats) {
      updateFields.push(`max_seats = $${paramCount++}`);
      updateValues.push(max_seats);
    }
    if (start_date) {
      updateFields.push(`start_date = $${paramCount++}`);
      updateValues.push(start_date);
    }
    if (description) {
      updateFields.push(`description = $${paramCount++}`);
      updateValues.push(description);
    }

    // Check if any fields are provided for update
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No fields provided for update",
      });
    }

    // Construct the final SQL query
    query = `UPDATE courses SET ${updateFields.join(
      ", "
    )} WHERE course_id = $${paramCount} AND instructor_id = $${
      paramCount + 1
    } RETURNING *`;
    values = [...updateValues, course_id, instructor_id];
    result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating course details:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// // Course registration API (A user can apply for a course by sharing their name, email, phone number and LinkedIn profile)
exports.register = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { name, email, phone_number, linkedin_profile } = req.body;

    let query =
      "INSERT INTO leads (course_id, name, email, phone_number, linkedin_profile, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    let values = [
      course_id,
      name,
      email,
      phone_number,
      linkedin_profile,
      "Waitlist",
    ];

    const result = await pool.query(query, values);
    return res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error Registering for the courses: ", error);
    return res.status(400).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
