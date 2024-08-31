const mongoose = require('mongoose');
const { Schema } = mongoose;

// Activity Schema
const activitySchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile', required: true },
    name: { type: String, required: true },
    hasTimeSlots: { type: Boolean, default: false },
    description: { type: String },
    availableTimeSlots: [
      {
        startTime: { type: String  },
        endTime: { type: String },
        hasSeatLimit: { type: Boolean, default: false },
        availableSeats: { type: Number }, // Remove `required` from here
      },
    ],
  },
  { timestamps: true }
);

// Package Schema
const packageSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: 'BusinessProfile', required: true },
    name: { type: String, required: true },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    adultPrice: { type: Number, required: true },
    childPrice: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create models
const Activity = mongoose.model('Activity', activitySchema);
const Package = mongoose.model('Package', packageSchema);

module.exports = { Activity, Package };
