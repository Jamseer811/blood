import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      default: "Coimbatore",
    },

    area: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    lastDonationDate: {
      type: Date,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Donor ||
  mongoose.model("Donor", donorSchema);