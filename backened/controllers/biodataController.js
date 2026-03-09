const Biodata = require("../models/Biodata");


// CREATE BIODATA
// helper used by both create & update to remove empty string values
const cleanObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const output = Array.isArray(obj) ? [] : {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v === '' || v == null) return;
    if (typeof v === 'object') {
      const nested = cleanObject(v);
      if (nested && (Array.isArray(nested) ? nested.length > 0 : Object.keys(nested).length > 0)) {
        output[k] = nested;
      }
    } else {
      output[k] = v;
    }
  });
  // if modern template, drop manglik field if present
  if (output.template === 'modern' && output.horoscope) {
    delete output.horoscope.manglik;
    if (Object.keys(output.horoscope).length === 0) {
      delete output.horoscope;
    }
  }
  return output;
};

exports.createBiodata = async (req, res) => {
  try {
    const payload = cleanObject(req.body);
    const newBiodata = new Biodata({
      userId: req.user.id,
      ...payload
    });

    const savedBiodata = await newBiodata.save();

    res.status(201).json(savedBiodata);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET USER BIODATA
exports.getUserBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findOne({
      userId: req.user.id
    });
    res.json(biodata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BIODATA ENTRIES (admin/debug) with pagination/filters
exports.getAllBiodata = async (req, res) => {
  try {
    const { page = 1, limit = 20, userId } = req.query;
    const query = {};
    if (userId) query.userId = userId;

    // privacy: non-admins and unauthenticated users only see public biodata
    if (!req.user || req.user.role !== 'admin') {
      query.public = true;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const docs = await Biodata.find(query)
      .skip(skip)
      .limit(Number(limit));
    const total = await Biodata.countDocuments(query);

    res.json({ data: docs, page: Number(page), limit: Number(limit), total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE USER'S BIODATA BY USER ID
exports.getBiodataByUserId = async (req, res) => {
  try {
    const biodata = await Biodata.findOne({ userId: req.params.userId });
    if (!biodata) return res.status(404).json({ message: 'Not found' });
    res.json(biodata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BIODATA
exports.updateBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findById(req.params.id);
    if (!biodata) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && biodata.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const payload = cleanObject(req.body);
    const updated = await Biodata.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE BIODATA
exports.deleteBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findById(req.params.id);
    if (!biodata) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && biodata.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await Biodata.findByIdAndDelete(req.params.id);
    res.json({
      message: "Biodata deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};