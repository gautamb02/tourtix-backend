const express = require("express");
const bypass = require("../middleware/bypass.middleware");
const organizationMiddleware = require("../middleware/organization.middleware");
const Organization = require("../models/organization.models");
const BusinessProfile = require("../models/business.models");

const businessRouter = express.Router();

businessRouter.get("/hello", bypass, (req, res) => {
  res.send("Hello");
});

businessRouter.post("/onboard", organizationMiddleware, async (req, res) => {
  try {
    const orgId = req.organization._id;

    // Required fields for the BusinessProfile
    const { businessName, category, address, city, pincode, state, country, geolocation, phone, email, website, hours, description, photos
    } = req.body;

    // Validate that all required fields are present
    if (
      !businessName || !category || !address || !city || !pincode || !state || !country || !geolocation || !phone || !email || !website || !hours || !description || !photos
    ) {
      return res.status(400).json({
        success: 0,
        error: "All required fields must be provided",
      });
    }

    // Create new BusinessProfile entry
    const newBusiness = new BusinessProfile({
      orgId,   businessName,category,address,city,pincode,state,country,geolocation,phone,email,website,hours,description,photos,
    });

    // Save the new BusinessProfile to the database
    const savedBusiness = await newBusiness.save();

    // Update the onboarded field in the Organization document
    await Organization.findByIdAndUpdate(orgId, { onboarded: true });

    // Respond with success
    res.status(201).json({ success: 1, savedBusiness });
  } catch (err) {
    res.status(400).json({ success: 0, error: err.message });
  }
});

module.exports = businessRouter;
