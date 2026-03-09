const express = require("express");
const router = express.Router();

const {
  createBiodata,
  getUserBiodata,
  updateBiodata,
  deleteBiodata,
  getAllBiodata,
  getBiodataByUserId
} = require("../controllers/biodataController");
const { body, validationResult } = require('express-validator');

const authMiddleware = require("../middleware/authMiddleware");

// create biodata
router.post(
  "/create",
  authMiddleware,
  [
    body('personalDetails.name').notEmpty().withMessage('Name required'),
    body('personalDetails.dob').notEmpty().withMessage('DOB required')
  ],
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({message:errors.array()[0].msg});
    next();
  },
  createBiodata
);

// get biodata of logged in user
router.get("/user", authMiddleware, getUserBiodata);

// **additional lookup endpoints**
const adminMiddleware = require("../middleware/adminMiddleware");
// list every biodata document (auth users see public only; admin sees all)
router.get("/", authMiddleware, getAllBiodata);
// get biodata by arbitrary user ID (admin or same user)
router.get("/user/:userId", authMiddleware, async (req, res, next) => {
  // allow when requestor is admin or requesting own record
  if (req.user.role === 'admin' || req.user.id === req.params.userId) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden' });
}, getBiodataByUserId);

// update biodata
router.put("/:id", authMiddleware, updateBiodata);

// delete biodata
router.delete("/:id", authMiddleware, deleteBiodata);

module.exports = router;