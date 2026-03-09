const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword,
  promoteToAdmin
} = require("../controllers/authController");
const { body, validationResult } = require('express-validator');

router.post(
  "/register",
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
  registerUser
);

router.post(
  "/login",
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
  loginUser
);

// non‑destructive retrieval - admin only
const adminMiddleware = require("../middleware/adminMiddleware");
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);

// profile management (logged-in user)
router.put("/me", authMiddleware, [
  body('email').optional().isEmail().withMessage('Valid email required')
], (req,res,next)=>{
  const errs = validationResult(req);
  if(!errs.isEmpty()) return res.status(400).json({message:errs.array()[0].msg});
  next();
}, updateProfile);
router.put("/me/password", authMiddleware, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({min:6})
], (req,res,next)=>{
  const errs = validationResult(req);
  if(!errs.isEmpty()) return res.status(400).json({message:errs.array()[0].msg});
  next();
}, changePassword);

// admin-only actions
router.put("/:id/promote", authMiddleware, adminMiddleware, promoteToAdmin);

module.exports = router;