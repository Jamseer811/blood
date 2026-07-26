import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    
    patientEmail: {
    type: String,
    required: true,
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

    hospital: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    matchedDonors: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  
  {
    timestamps: true,
  }
);

export default mongoose.models.BloodRequest ||
  mongoose.model("BloodRequest", BloodRequestSchema);