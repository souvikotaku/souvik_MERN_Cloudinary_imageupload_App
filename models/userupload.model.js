const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const useruploadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    isUploaded: { type: Boolean, default: false },
    cloudinary_id: { type: String },
  },

  { timestamps: true }
);

const Userupload = mongoose.model("userupload", useruploadSchema);

module.exports = Userupload;
