const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../util/util");

const Admin = require("../models/admin");

class AdminAuthController {
  //signup admin

  signup = async (req, res, next) => {
    const { universityId, name, password } = req.body;
    if (!universityId || !password) {
      return res.status(400).json({ message: "Arguments not provided" });
    }

    try {
      const admin = await Admin.findOne({ universityId });
      if (admin) {
        return res.status(409).json({ message: "Admin already exists" });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      const newAdmin = new Admin({
        universityId,
        password: hashedPassword,
        name,
      });

      const result = await newAdmin.save();
      // Generate a JWT token
      const token = generateToken({ universityId, role: "admin" });
      res.json({ token });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  //login admin

  login = async (req, res, next) => {
    const { universityId, password } = req.body;
    if (!universityId || !password) {
      return res.status(400).json({ message: "Arguments not provided" });
    }
    try {
      // Find the provider in the database
      const admin = await Admin.findOne({ universityId });
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare the password with the stored hash
      const passwordMatch = await comparePassword(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials pass" });
      }

      // Generate a JWT token

      const token = generateToken({ universityId, role: "admin" });
      res.status(201).json({
        token,
        user: {
          name: admin.name,
          universityId: admin.universityId,
          role: "admin",
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
module.exports = new AdminAuthController();
