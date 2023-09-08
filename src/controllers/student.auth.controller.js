const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../util/util");

const Student = require("../models/student");

class StudentAuthController {
  //signup student
  signup = async (req, res, next) => {
    const { universityId, name, password } = req.body;
    if (!universityId || !password) {
      return res.status(400).json({ message: "Arguments not provided" });
    }

    try {
      const student = await Student.findOne({ universityId });
      if (student) {
        return res.status(409).json({ message: "Student already exists" });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      const newStudent = new Student({
        universityId,
        password: hashedPassword,
        name,
      });

      await newStudent.save();
      // Generate a JWT token
      const token = generateToken({ universityId, role: "student" });
      res.json({ token });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  //login student
  login = async (req, res, next) => {
    const { universityId, password } = req.body;
    if (!universityId || !password) {
      return res.status(400).json({ message: "Arguments not provided" });
    }
    try {
      // Find the student in the database
      const student = await Student.findOne({ universityId });
      if (!student) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare the password with the stored hash
      const passwordMatch = await comparePassword(password, student.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials pass" });
      }

      // Generate a JWT token

      const token = generateToken({ universityId, role: "student" });
      res.status(200).json({
        token,
        user: {
          role: "student",
          universityId: student.universityId,
          name: student.name,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new StudentAuthController();
