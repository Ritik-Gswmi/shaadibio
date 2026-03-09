const mongoose = require("mongoose");

const biodataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    personalDetails: {
      name: String,
      dob: String,
      age: Number,
      height: String,
      religion: String
    },

    familyDetails: {
      fatherName: String,
      fatherOccupation: String,
      motherName: String,
      motherOccupation: String,
      siblings: String
    },

    educationProfession: {
      education: String,
      college: String,
      occupation: String,
      income: String
    },

    horoscope: {
      rashi: String,
      nakshatra: String,
      manglik: String
    },

    photo: String,

    template: String,

    // whether the biodata is public (visible to others)
    public: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Biodata", biodataSchema);