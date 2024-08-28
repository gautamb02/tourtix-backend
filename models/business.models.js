const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema for Hours
const hoursSchema = new Schema({
  start_time: { type: String },
  end_time: { type: String },
});

// Main FormData Schema
const BusinessProfileSchema = new Schema(
  {
    orgId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    businessName: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    geolocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    hours: {
      type: Map,
      of: new Schema({
        open: { type: Boolean, required: true },
        hours: {
          type: hoursSchema,
          required: function () {
            return this.open;
          },
        },
      }),
      required: true,
    },
    description: { type: String, required: true },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

const BusinessProfile = mongoose.model(
  "BusinessProfile",
  BusinessProfileSchema
);

module.exports = BusinessProfile;
